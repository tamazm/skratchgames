import { useState, useEffect } from "react";
import styles from "./QuizGame3.module.css";
import ilusImg from "../../assets/quizz/ilus1.png";
import qimg from "../../assets/quizz/qimg.jpg";
import qimg1 from "../../assets/quizz/qimg1.jpg";
import qimg2 from "../../assets/quizz/qimg2.jpg";
import qimg3 from "../../assets/quizz/qimg3.jpg";

import x from "../../assets/quizz/x.png";
import img6 from "../../assets/quizz/coin1.png";
import img7 from "../../assets/quizz/checki.png";
import Form from "../Form/Form";

const questions = [
  {
    question: "Who is the alter ego of Iron Man?",
    options: ["Steve Rogers", "Bruce Banner", "Tony Stark"],
    correctAnswer: "Tony Stark",
    image: qimg,
  },
  {
    question: "What is the name of Thor’s hammer?",
    options: ["Stormbreaker", "Mjolnir", "Gungnir"],
    correctAnswer: "Mjolnir",
    image: qimg1,
  },
  {
    question: "Who is the Sorcerer Supreme?",
    options: ["Doctor Strange", "Loki", "Wanda Maximoff"],
    correctAnswer: "Doctor Strange",
    image: qimg3,
  },
  {
    question: "Who sacrifices themselves to obtain the Soul Stone?",
    options: ["Tony Stark", "Natasha Romanoff", "Steve Rogers"],
    correctAnswer: "Natasha Romanoff",
    image: qimg3,
  },
  {
    question: "Who is Rocket's partner?",
    options: ["Groot", " Star-Lord", "Drax"],
    correctAnswer: "Groot",
    image: qimg2,
  },

  {
    question: "What is the name of Black Panther’s homeland?",
    options: ["Wakanda", "Atlantis", "Asgard"],
    correctAnswer: "Wakanda",
    image: qimg3,
  },
  {
    question: "Who is the ruler of Asgard in the Marvel Cinematic Universe?",
    options: ["Odin", "Loki", "Thor"],
    correctAnswer: "Odin",
    image: qimg3,
  },
];
function QuizzGame3() {
  const [startQuiz, setStartQuiz] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [timeLeft, setTimeLeft] = useState(18000); // 3 minutes in seconds
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null); // Track selected option for each question
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0); // Track user's score
  const [coins, setCoins] = useState(0); // Track user's coins
  const [isCorrect, setIsCorrect] = useState(null);
  const [coins1, setcoin1] = useState(0);
  const [result, setresult] = useState(false);
  const [isOptionSelected, setIsOptionSelected] = useState(false);
  const [check, setcheck] = useState(false);
  const [page, setpage] = useState(0);

  useEffect(() => {
    setAnswers(Array(questions.length).fill(null));
  }, [questions]);

  useEffect(() => {
    if (startQuiz && !quizComplete) {
      const timer = setTimeout(() => {
        if (timeLeft > 0) {
          setTimeLeft(timeLeft - 1);
        } else {
          endGame(); // End the game when time runs out
        }
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [timeLeft, startQuiz, quizComplete]);

  const handlePage = () => {
    setpage(page + 1);
  };

  const startQuizHandler = () => {
    setStartQuiz(true);
  };
  const restartQuizHandler = () => {
    setStartQuiz(false); // Set startQuiz to false to display the "Start Quiz" button again
    setQuizComplete(false);
    setTimeLeft(180); // Reset time to 3 minutes
    setCurrentQuestionIndex(0); // Reset to the first question
    setSelectedOption(null); // Reset selected option
    setAnswers(Array(questions.length).fill(null)); // Reset answers array
    setScore(0); // Reset score
    setCoins(0); // Reset coins
    setIsCorrect(null); // Reset correctness state
  };
  const handleOptionSelect = (index) => {
    setIsOptionSelected(true);
    setSelectedOption(index);
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] =
      questions[currentQuestionIndex].options[index];
    setAnswers(newAnswers);
    if (
      questions[currentQuestionIndex].options[index] ===
      questions[currentQuestionIndex].correctAnswer
    ) {
      setIsCorrect(true);
      // Generate random coins between 10 and 50
      const earnedCoins = Math.floor(Math.random() * 41) + 10;
      setCoins(coins + earnedCoins);
      setcoin1(earnedCoins);
      setresult(true);
      setcheck(true);
    } else {
      setIsCorrect(false);
    }
    setTimeout(() => {
      setIsOptionSelected(false); // Reset to false before moving to the next question
      handleNextQuestion();
      setresult(false);
      setcheck(false);
    }, 1000);
  };
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null); // Reset selected option for the next question
    } else {
      endGame();
    }
  };

  const endGame = () => {
    // Calculate score
    let correctCount = 0;
    for (let i = 0; i < questions.length; i++) {
      if (answers[i] === questions[i].correctAnswer) {
        correctCount++;
      }
    }
    setScore(correctCount);
    setQuizComplete(true);
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className={styles.main}>
      {page === 0 && (
        <>
          <Form type="slot" preview={preview} setPage={handlePage} accentColor={"Red"} gradient={'linear-gradient(to right, #960000 0%, #d40000 11%, #c20000 53%, #f70000 100%)'}/>
        </>
      )}
      {page === 1 && (
        <>
          {!startQuiz && !quizComplete && (
            <div className={styles.enterDiv}>
              <img
                src={ilusImg}
                alt="illustration"
                style={{ width: "20rem" }}
                className={styles.ilusImg}
              />
              <div className={styles.infoDiv5}>
                <p
                  style={{
                    fontSize: "1.5rem",
                    color: "#fff",
                  }}
                  className={styles.text1}
                >
                  Welcome to FunQuiz Academy!
                </p>
                <p
                  style={{ color: "#fff", fontSize: "0.8rem" }}
                  className={styles.text2}
                >
                  play quizzes with your friends and get various prizes
                </p>
                <button className={styles.StartBtn} onClick={startQuizHandler}>
                  GET STARTED
                </button>
              </div>
            </div>
          )}
          {(startQuiz || quizComplete) && (
            <div className={styles.VisibleQuizzGame}>
              {!quizComplete && (
                <div className={styles.QuizCanvas}>
                  <div className={styles.HeaderDiv}>
                    <div className={styles.PageCounterDiv}>
                      <div className={styles.exitBtnDiv}>
                        <button
                          className={styles.exitBtn}
                          onClick={restartQuizHandler}
                        >
                          <img src={x} onClick={restartQuizHandler} />
                        </button>
                      </div>
                      <div className={styles.TimerDiv}>
                        <p className={styles.TimerCount}>
                          {Math.floor(timeLeft / 60)}:{timeLeft % 60}
                        </p>
                      </div>
                      <div className={styles.coinDiv}>
                        <p
                          style={{ color: "#181818" }}
                          className={styles.coinCounter}
                        >
                          {coins}
                        </p>
                        <img src={img6} alt="coin" className={styles.coinImg} />
                      </div>
                    </div>
                  </div>
                  <div className={styles.QuizQuestionDiv}>
                    <div className={styles.QuestionHeaderDiv}>
                      {currentQuestion.image && (
                        <img
                          src={currentQuestion.image}
                          alt="question image"
                          className={styles.img4}
                        />
                      )}
                      <p className={styles.PageCounter}>
                        {currentQuestionIndex + 1} of {questions.length}{" "}
                        Questions
                      </p>
                      <p className={styles.QuestionHeader}>
                        {currentQuestion.question}
                      </p>
                    </div>
                    <div className={styles.QuestionBtnDiv}>
                      {currentQuestion.options.map((option, index) => (
                        <div
                          className={styles.btnDiv}
                          style={{
                            display:
                              isOptionSelected && selectedOption !== index
                                ? "none"
                                : "block",
                          }}
                        >
                          <button
                            key={index}
                            className={styles.QuestionBtn}
                            style={{
                              color:
                                selectedOption === index
                                  ? isCorrect
                                    ? "green"
                                    : "red"
                                  : "black",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-around",
                            }}
                            onClick={() => handleOptionSelect(index)}
                          >
                            {check && (
                              <img src={img7} style={{ width: "1.5rem" }} />
                            )}
                            {option}
                            {check && <div style={{ width: "1.5rem" }}></div>}
                          </button>
                        </div>
                      ))}
                      {result && (
                        <div className={styles.resultDiv}>
                          <p>That’s the right Answer {coins1} Coins</p>
                          <img src={img6} style={{ width: "2rem" }} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
              {quizComplete && (
                <div className={styles.ResultDiv}>
                  <div className={styles.ResultDivLayer2}>
                    <h2 style={{ color: "#fff" }}>Quiz Complete!</h2>
                    <div className={styles.coinDiv}>
                      <p
                        style={{ color: "#181818" }}
                        className={styles.coinCounter}
                      >
                        {coins}
                      </p>
                      <img src={img6} alt="coin" className={styles.coinImg} />
                    </div>
                    <p style={{ color: "#fff" }}>
                      Your score: {score} out of {questions.length}
                    </p>
                    <button
                      className={styles.RestartButton}
                      onClick={()=>{setpage(0)}}
                    >
                      Restart Quiz
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default QuizzGame3;
