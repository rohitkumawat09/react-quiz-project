import { useEffect, useState, useRef } from "react";
import "./App.css";
import image1 from "./img/image.png";
import { FaAnglesRight } from "react-icons/fa6";
import { quiz } from "./questions.js";

const categories = [
  { id: 1, name: "Movies" },
  { id: 2, name: "Farming" },
  { id: 3, name: "Culture" },
  { id: 4, name: "History" },
];

function App() {
  const [name, setName] = useState("");
  const [createdUser, setCreatedUser] = useState("");
  const [showSection, setShowSection] = useState(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [step, setStep] = useState(0);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [questions, setQuestions] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [countdown, setCountdown] = useState(5);
  const timerRef = useRef(null);
  const [score, setScore] = useState(0);




  useEffect(() => {
    if (selectedTopic) {
      const temp = quiz.find((obj) => obj.category === selectedTopic);
      setQuestions(temp.questions);
    }
  }, [selectedTopic]);

  useEffect(() => {
    if (selectedTopic) {
      const temp = quiz.find((obj) => obj.category === selectedTopic);
      setQuestions(temp.questions);
    }
  }, [selectedTopic]);

  useEffect(() => {
    if (step === 2 && questions) {
      setCountdown(5); // Reset countdown when a new question is displayed
      timerRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            clearInterval(timerRef.current);
            handleNextQuestion(); 
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timerRef.current); // Cleanup timer on unmount or step change
  }, [step, questionNumber, questions]);

  console.log("questionNumber", questionNumber);

  function handleCreateUser() {
    if (name.trim()) {
      const existingScores = JSON.parse(localStorage.getItem("quizScores")) || [];

      const newEntry = {
        id: Date.now(),
        name: name,
        score: 0,
        category: 0,
  
    };
    const updatedScores = [...existingScores, newEntry];
        localStorage.setItem("quizScores", JSON.stringify(updatedScores));
    
      setCreatedUser(name);
      setMessage("User Created Successfully!");
      setMessageType("success");
      setShowSection(null);
    } else {
      setMessage("Please Enter a Name to Create User");
      setMessageType("error");
    }

    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 2000);
  }

  function startQuiz() {
    if (createdUser) {
      setMessage("");
      setStep(1);
      //  setStep(2);
    } else {
      setMessage("Please Create a User First");
      setMessageType("error");
      setStep(0);
      setTimeout(() => {
        setMessage("");
        setMessageType("");
      }, 2000);
    }
  }

  function handleTopicSelect(topic) {
    setSelectedTopic(topic);
  }
  function beginQuiz() {
    if (selectedTopic) {
      setStep(2);
    } else {
      setMessage("Please select a topic first.");
      setMessageType("error");
      setTimeout(() => {
        setMessage("");
        setMessageType("");
      }, 2000);
    }
  }

  function handleNextQuestion() {
  
    if (questionNumber < questions.length - 1) {
      setQuestionNumber((prev) => prev + 1);

    } else {
      
      setMessage("Quiz Completed!");
      setMessageType("success");
      // setStep(0); // Reset to the initial step
      setStep(3); // Reset to the initial step

    }
  }


  


  function handleAnswer(selectedAnswer) {
    const currentQuestion = questions[questionNumber];
    if (selectedAnswer === currentQuestion.a) {
      setScore((prevScore) => prevScore + 1);
    }
    console.log("Current Score:", score);
    handleNextQuestion();
  }
  return (
    <>
      <div className="header">
        <div className="pop">
          <h1>Quiz</h1>
        </div>

        {step > 0 && (
          <div className="home_quix_score">
            <h4>Home</h4>
            <h4>Quiz</h4>
            <h4>Score</h4>
          </div>
        )}

        <div className="start">
          {!createdUser ? (
            <button onClick={() => setShowSection("form")}>Create User</button>
          ) : (
            <button onClick={() => setShowSection("form")}>
              {createdUser}
            </button>
          )}
        </div>
      </div>

      {step === 0 && (
        <div className="username">
          <div className="text">
            <h1>
              Take Your <span>Knowledge</span> to the Next Level
            </h1>
            <div className="Start">
              <button onClick={startQuiz}>
                Start Quiz <FaAnglesRight />
              </button>
            </div>
          </div>
          <div className="img">
            <img src={image1} alt="Quiz Illustration" />
          </div>
        </div>
      )}

      <div className="parent">
        {message && (
          <div
            className={`create_user ${messageType}`}
            style={{
              backgroundColor: messageType === "success" ? "green" : "red",
              color: "white",
              padding: "10px",
              borderRadius: "5px",
              marginTop: "10px",
            }}
          >
            <h4>{message}</h4>
          </div>
        )}

        {showSection === "form" && (
          <div className="input">
            <label>User Name:</label>
            <br />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />
            <br />
            <div className="Create">
              <button
                className="Next"
                onClick={handleCreateUser}
                style={{ backgroundColor: "black", color: "white" }}
              >
                Create
              </button>
              <button
                className="Quit"
                onClick={() => setShowSection(null)}
                style={{ backgroundColor: "red", color: "white" }}
              >
                Quit
              </button>
            </div>
          </div>
        )}

        {step === 1 && (
          
          <div className="topic-selection">
            <h1>Welcome, {createdUser}!</h1>
            <p className="choose-category">Select a Quiz Category:</p>
            <div className="categories">
              {categories.map((obj) => {
                return (
                  <div
                    className="category"
                    key={obj.id}
                    onClick={() => handleTopicSelect(obj.name)}
                  >
                    {obj.name}
                  </div>
                );
              })}
            </div>
            <button className="Start-btn" onClick={beginQuiz}>
              Start
            </button>
            
          </div>
        )}

        {step === 2 && selectedTopic && (
          <div className="quiz-page">
            <h2>{selectedTopic} Quiz</h2>

            {questions && (
              <>
                <h2>{questions[questionNumber].q}</h2>
                <div className="options">
                  {questions[questionNumber].options.map((option, index) => (
                    <p className="option" key={index} onClick={() => handleAnswer(option)}>
                      {option}
                    </p>
                  ))}
                </div>
                <div className="countdown">
                  Time Remaining: {countdown} seconds
                </div>
              </>
            )}
          </div>
        )}



{step === 3 && (
  <div className="score-screen">
    <h1>Quiz Completed!</h1>
    <h2>Well done, {createdUser}!</h2>
    <h2>Your Score: {score} </h2>
    <h2> questions{questions.length}</h2>
    <button onClick={() => {
      setStep(0);
      setScore(0);
      setCreatedUser("");
      setName("");
      setQuestionNumber(0);
      setSelectedTopic("");
      setQuestions(null);
      setCountdown(5);
      setShowSection(null);
    }}>Play Again</button>
  </div>
)}

      </div>
    </>
  );
}
export default App;
