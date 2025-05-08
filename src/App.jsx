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
  const [currentTime, setCurrentTime] = useState(new Date());
  const [scoreList, setScoreList] = useState([]);


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());




    }, 1000);
    return () => clearInterval(interval);
  }, []);



  useEffect(() => {
    if (step === 3) {
      const savedScores = JSON.parse(localStorage.getItem("quizScores")) || [];
      setScoreList(savedScores);
    }
  }, [step]);



  useEffect(() => {
    if (selectedTopic) {
      const temp = quiz.find((obj) => obj.category === selectedTopic);
      setQuestions(temp.questions);
    }
  }, [selectedTopic]);



  useEffect(() => {
    if (step === 2 && questions) {
      setCountdown(5); 
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
      const isUpdate = createdUser && createdUser !== name;
     
      if (isUpdate) {
        setMessage("User Updated Successfully!");
      } else {
        setMessage("User Created Successfully!");
      }
      
    
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
    }, 4000);
  }

  function startQuiz() {
    if (createdUser) {
      setMessage("");
      setStep(1);
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
    setMessage("Topic selected successfully!");
    setMessageType("success");
    setQuestionNumber(0);
    setScore(0);
    setStep(2); 
  
    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 2000);
  }
  
  // function beginQuiz() {
  //   if (selectedTopic) {

  //     setStep(2); 
  //     setQuestionNumber(0);
  //     setScore(0);

  //   } else {
  //     setMessage("Please select a topic first.");
  //     setMessageType("error");
  //     setTimeout(() => {
  //       setMessage("");
  //       setMessageType("");
  //     }, 2000);
  //   }
  // }

  function handleNextQuestion() {
    clearInterval(timerRef.current);

    if (questionNumber < questions.length - 1) {
      setQuestionNumber((prev) => prev + 1);

    } else {
      const existingScores = JSON.parse(localStorage.getItem("quizScores")) || [];

      const newEntry = {
        id: Date.now(),
        name: createdUser,
        score: score,
        totalQuestions: questions.length,
        category: selectedTopic,
        // date: new Date().toLocaleDateString(),
        date: new Date().toLocaleDateString("en-GB", {
          day: "numeric",
          month: "numeric",
          year: "numeric",
        }).replace(/\//g, ","),
        time: new Date().toLocaleTimeString(),
      };

      localStorage.setItem("quizScores", JSON.stringify([...existingScores, newEntry]));

      // setMessage("Quiz Completed!");
      setMessageType("success");
      // setStep(0); // Reset to the initial step
      // setStep(3); // Reset to the initial step
      setTimeout(() => {
        // setMessage("");
        setMessageType("");
        setStep(3);
      }, 2000);
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

            <button onClick={() => {
  // setCreatedUser("");
  // setName("");
  setStep(0);
  setSelectedTopic("");
  setQuestions(null);
  setScore(0);
  setQuestionNumber(0);
}}>Home</button>

            <button onClick={() => setStep(1)}>Quiz</button>
            <button onClick={() => setStep(3)}>Score</button>




          </div>
        )}


        <div className="start">
          {!createdUser ? (
            <button onClick={() => {
              setShowSection("form");
              setName("");
            }}>Create User</button>
          ) : (
            <>
              <button onClick={() => setShowSection("form")}>
                {createdUser}
              </button>
              <button onClick={() => {
                setCreatedUser("");
                setName("");
                setStep(0);
                setSelectedTopic("");
                setQuestions(null);
                setScore(0);
                setQuestionNumber(0);
              }} style={{ marginLeft: "10px", backgroundColor: "red", color: "white" }}>
                Logout
              </button>
            </>
          )}
        </div>

      </div>

      {step === 0 && (
        <div className="username">
          <div className="text">
            <div id="Desiner_text"> <h1>
              Take Your <span>Knowledge</span><br /> to the Next Level
            </h1></div>
           
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
            {/* <button className="Start-btn" onClick={beginQuiz}>
              Start
            </button> */}

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
                  <div className="next">
                    <button onClick={handleNextQuestion}>Next</button>
                  </div>
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
            <h1>All Quiz Scores</h1>
            <table border="1" cellPadding="10" style={{ margin: "20px auto", textAlign: "left" }}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Score</th>
                  <th>Total Questions</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Current Time:</th>
                </tr>
              </thead>
              <tbody>
                {scoreList.map((entry) => (
                  <tr key={entry.id}>
                    <td>{entry.name}</td>
                    <td>{entry.score}</td>
                    <td>{entry.totalQuestions}</td>
                    <td>{entry.category}</td>
                    <td>{entry.date}</td>
                    <td>{entry.time}</td>
                    <td>{currentTime.toLocaleTimeString()}</td>

                  </tr>
                ))}
              </tbody>
            </table>

            <button onClick={() => {
              setStep(0);
              setScore(0);
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
