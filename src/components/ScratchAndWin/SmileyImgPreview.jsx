import React, { useEffect, useState, useCallback, useRef } from "react";
import SmileyWText from "./assets/smile-with-text.png";

function SmileyImgPreview({ id, functional, randomValue, onUpdate, onScratchUpdate, animationType }) {
  const [scratchedPixels, setScratchedPixels] = useState(0);
  const [totalPixels, setTotalPixels] = useState(0);
  const [loading, setLoading] = useState(true);
  const [currentPossibility, setCurrentPossibility] = useState("");
  const [isScratching, setIsScratching] = useState(false);

  const nonPreviewBottomImgSrc = SmileyWText;
  const canvasId = `scratch-card-${id}-${randomValue}`;
  const progressRef = useRef(0);

  const loadImage = useCallback((src, callback, retryCount = 0) => {
    const image = new Image();
    image.crossOrigin = "Anonymous";
    image.onload = () => callback(null, image);
    image.onerror = (err) => {
      if (retryCount < 3) {
        setTimeout(() => loadImage(src, callback, retryCount + 1), 1000);
      } else {
        callback(err);
      }
    };
    image.src = src;
  }, []);

  const drawImageOnCanvas = useCallback(
    (image) => {
      const canvas = document.getElementById(canvasId);
      const context = canvas?.getContext("2d", { willReadFrequently: true });

      if (canvas && context) {
        const isMobile = window.matchMedia("only screen and (max-width: 767px)").matches;
        const scaleFactor = isMobile && functional ? 22.5 : 9;

        canvas.height = image.height / scaleFactor;
        canvas.width = image.width / scaleFactor;

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
        setTotalPixels(canvas.width * canvas.height);
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
          console.error("Failed to load image", err);
        } else {
          drawImageOnCanvas(img);
        }
      });
    }
  }, [canvasId, loadImage, drawImageOnCanvas, nonPreviewBottomImgSrc]);

  useEffect(() => {
    loadImage(nonPreviewBottomImgSrc, (err, img) => {
      if (err) {
        console.error("Failed to load image", err);
      } else {
        drawImageOnCanvas(img);
      }
      setLoading(false);
    });
  }, [loadImage, drawImageOnCanvas, nonPreviewBottomImgSrc]);

  const scratch = (x, y) => {
    const canvas = document.getElementById(canvasId);
    const context = canvas?.getContext("2d");

    if (context) {
      context.globalCompositeOperation = "destination-out";
      context.beginPath();
      context.arc(x, y, 40, 0, 2 * Math.PI);
      context.fill();

      requestAnimationFrame(() => {
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        let scratchedCount = 0;

        for (let i = 0; i < imageData.data.length; i += 4) {
          if (imageData.data[i + 3] === 0) {
            scratchedCount++;
          }
        }

        setScratchedPixels(scratchedCount);
        const percentageScratched = (scratchedCount / totalPixels) * 100;
        progressRef.current = percentageScratched;

        // Call `onScratchUpdate` immediately with updated progress
        onScratchUpdate(percentageScratched >= 33, progressRef.current);
      });
    }
  };

  const handlePointerDown = (event) => {
    if (functional) {
      setIsScratching(true);
      const canvas = document.getElementById(canvasId);
      if (canvas) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        if (x >= 0 && x <= canvas.width && y >= 0 && y <= canvas.height) {
          scratch(x, y);
        }
      }
    }
  };

  const handlePointerMove = (event) => {
    if (isScratching) {
      const canvas = document.getElementById(canvasId);
      if (canvas) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        if (x >= 0 && x <= canvas.width && y >= 0 && y <= canvas.height) {
          scratch(x, y);
        }
      }
    }
  };

  const handlePointerUp = () => {
    if (isScratching) {
      setIsScratching(false);
      const percentageScratched = progressRef.current;
      if (percentageScratched >= 33) {
        onUpdate(randomValue);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("pointermove", handlePointerMove);
    document.addEventListener("pointerup", handlePointerUp);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerup", handlePointerUp);
    };
  }, [isScratching]);

  useEffect(() => {
    setCurrentPossibility(randomValue);
  }, [randomValue]);

  useEffect(() => {
    if (!functional) {
      const canvas = document.getElementById(canvasId);
      const context = canvas?.getContext("2d");

      if (canvas && context) {
        let swipePath = [];
        const step = 10;

        if (animationType === 1) {
          for (let i = 0; i < Math.max(canvas.width, canvas.height); i += step) {
            swipePath.push({ x: i, y: i });
          }
        } else if (animationType === 2) {
          const centerX = canvas.width / 2;
          const centerY = canvas.height / 2;
          let angle = 0;
          let radius = 0;
          const spiralSpeed = 1;

          while (radius < Math.max(canvas.width, canvas.height)) {
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);
            swipePath.push({ x, y });
            angle += spiralSpeed;
            radius += step / 20;
          }
        } else if (animationType === 3) {
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
          }
        }, 25);

        return () => clearInterval(interval);
      }
    }
  }, [functional, animationType, canvasId, resetCanvas]);

  return (
    <div className="relative flex justify-center items-center">
      <p
        className="absolute"
        style={{
          userSelect: "none",
          fontSize: "1.25rem",
        }}
      >
        {loading ? "Loading..." : currentPossibility}
      </p>
      <canvas className="z-20" id={canvasId} />
    </div>
  );
}

export default SmileyImgPreview;
