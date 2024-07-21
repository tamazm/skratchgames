import React, { useEffect, useState, useCallback } from "react";
import SmileyWText from "./assets/smile-with-text.png";

function SmileyImgPreview({ id, functional, randomValue, onUpdate, onScratchUpdate, animationType }) {
  const [scratchedPixels, setScratchedPixels] = useState(0);
  const [loading, setLoading] = useState(true);
  const [currentPossibility, setCurrentPossibility] = useState("");

  const nonPreviewBottomImgSrc = SmileyWText;
  const canvasId = `scratch-card-${id}-${randomValue}`; // Combine id and randomValue for unique canvas ID

  const loadImage = useCallback((src, callback) => {
    const image = new Image();
    image.crossOrigin = "Anonymous";
    image.onload = () => callback(null, image);
    image.onerror = (err) => callback(err);
    image.src = src;
  }, []);

  const drawImageOnCanvas = useCallback(
    (image) => {
      const canvas = document.getElementById(canvasId);
      const context = canvas?.getContext("2d", { willReadFrequently: true });

      if (canvas && context) {
        canvas.height = image.height / 4;
        canvas.width = image.width / 4;

        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;

        const imgAspectRatio = image.width / image.height;
        const canvasAspectRatio = canvasWidth / canvasHeight;

        let drawWidth, drawHeight, offsetX, offsetY;

        if (canvasAspectRatio > imgAspectRatio) {
          drawWidth = canvasWidth;
          drawHeight = canvasWidth / imgAspectRatio;
          offsetX = 0;
          offsetY = (canvasHeight - drawHeight) / 2;
        } else {
          drawWidth = canvasHeight * imgAspectRatio;
          drawHeight = canvasHeight;
          offsetX = (canvasWidth - drawWidth) / 2;
          offsetY = 0;
        }

        context.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
      }
    },
    [canvasId]
  );

  const resetCanvas = useCallback(() => {
    const canvas = document.getElementById(canvasId);
    const context = canvas?.getContext("2d");

    if (canvas && context) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      setScratchedPixels(0);
      loadImage(nonPreviewBottomImgSrc, (err, img) => {
        if (err) {
          // console.error("Failed to load image", err);
        } else {
          drawImageOnCanvas(img);
        }
      });
    }
  }, [canvasId, loadImage, drawImageOnCanvas, nonPreviewBottomImgSrc]);

  useEffect(() => {
    const loadImages = () => {
      loadImage(nonPreviewBottomImgSrc, (err, img) => {
        if (err) {
          // console.error("Failed to load image", err);
        } else {
          drawImageOnCanvas(img);
        }
        setLoading(false);
      });
    };

    loadImages();
  }, [loadImage, drawImageOnCanvas, nonPreviewBottomImgSrc]);

  const scratch = (x, y) => {
    const canvas = document.getElementById(canvasId);
    const context = canvas?.getContext("2d");

    if (context) {
      context.globalCompositeOperation = "destination-out";
      context.beginPath();
      context.arc(x, y, 40, 0, 2 * Math.PI);
      context.fill();

      // Update scratched pixels count
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      let scratchedCount = 0;

      for (let i = 0; i < imageData.data.length; i += 4) {
        if (imageData.data[i + 3] === 0) {
          scratchedCount++;
        }
      }

      setScratchedPixels(scratchedCount);
    }
  };

  const init = useCallback(() => {
    let isDragging = false;
    const canvas = document.getElementById(canvasId);

    const handleMouseDown = (event) => {
      if (functional) {
        isDragging = true;
        scratch(event.offsetX, event.offsetY);
      }
    };

    const handleMouseMove = (event) => {
      if (isDragging) {
        scratch(event.offsetX, event.offsetY);
      }
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const handleTouchStart = (event) => {
      if (functional) {
        isDragging = true;
        const touch = event.touches[0];
        scratch(touch.pageX - canvas.offsetLeft, touch.pageY - canvas.offsetTop);
      }
    };

    const handleTouchMove = (event) => {
      if (isDragging) {
        event.preventDefault();
        const touch = event.touches[0];
        const rect = canvas.getBoundingClientRect();
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;
        scratch(x, y);
      }
    };

    const handleTouchEnd = () => {
      isDragging = false;
    };

    if (canvas) {
      canvas.addEventListener("mousedown", handleMouseDown);
      canvas.addEventListener("mousemove", handleMouseMove);
      canvas.addEventListener("mouseup", handleMouseUp);
      canvas.addEventListener("touchstart", handleTouchStart);
      canvas.addEventListener("touchmove", handleTouchMove);
      canvas.addEventListener("touchend", handleTouchEnd);

      return () => {
        canvas.removeEventListener("mousedown", handleMouseDown);
        canvas.removeEventListener("mousemove", handleMouseMove);
        canvas.removeEventListener("mouseup", handleMouseUp);
        canvas.removeEventListener("touchstart", handleTouchStart);
        canvas.removeEventListener("touchmove", handleTouchMove);
        canvas.removeEventListener("touchend", handleTouchEnd);
      };
    }
  }, [scratch, canvasId, functional]);

  useEffect(() => {
    const handleEndScratch = () => {
      const canvas = document.getElementById(canvasId);
      if (canvas) {
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const totalPixels = canvasWidth * canvasHeight;

        const percentageScratched = (scratchedPixels / totalPixels) * 100;

        if (percentageScratched >= 33) {
          onUpdate(randomValue);
          onScratchUpdate(true, percentageScratched);
        } else {
          onScratchUpdate(false, percentageScratched);
        }
      }
    };

    const canvas = document.getElementById(canvasId);
    if (canvas) {
      canvas.addEventListener("mouseup", handleEndScratch);
      canvas.addEventListener("touchend", handleEndScratch);

      return () => {
        canvas.removeEventListener("mouseup", handleEndScratch);
        canvas.removeEventListener("touchend", handleEndScratch);
      };
    }
  }, [scratchedPixels, onUpdate, onScratchUpdate, randomValue, canvasId]);

  useEffect(() => {
    setCurrentPossibility(randomValue);
  }, [randomValue]);

  useEffect(() => {
    init();
  }, [init]);

  useEffect(() => {
    if (!functional) {
      const canvas = document.getElementById(canvasId);
      const context = canvas?.getContext("2d");

      if (canvas && context) {
        let swipePath = [];
        const step = 10; // Number of pixels per step

        if (animationType === 1) {
          // Diagonal from top-left to bottom-right
          for (let i = 0; i < Math.max(canvas.width, canvas.height); i += step) {
            swipePath.push({ x: i, y: i });
          }
        } else if (animationType === 2) {
          // Spiral
          const centerX = canvas.width / 2;
          const centerY = canvas.height / 2;
          let angle = 0;
          let radius = 0;
          const spiralSpeed = 1; // Adjust the speed of the spiral

          while (radius < Math.max(canvas.width, canvas.height)) {
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);
            swipePath.push({ x, y });
            angle += spiralSpeed;
            radius += step / 20;
          }
        } else if (animationType === 3) {
          // Horizontal lines
          for (let y = 0; y < canvas.height; y += step) {
            for (let x = 0; x < canvas.width; x += step) {
              swipePath.push({ x, y });
            }
          }
        }

        let currentStep = 0;
        const interval = setInterval(() => {
          const { x, y } = swipePath[currentStep];
          scratch(x, y);
          currentStep += 1;

          if (currentStep >= swipePath.length) {
            clearInterval(interval);
            // resetCanvas()
          }
        }, 25); // Adjust speed for smoother effect

        return () => clearInterval(interval);
      }
    }
  }, [functional, animationType, canvasId, resetCanvas]);

  return (
    <div className="relative flex justify-center items-center">
      <p className="absolute">{loading ? "" : currentPossibility}</p>
      <canvas className="z-20" id={canvasId} />
    </div>
  );
}

export default SmileyImgPreview;
