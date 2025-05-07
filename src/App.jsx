import { useEffect, useState } from "react";
import "./App.css";
import image1 from "./img/image.png";
import { FaAnglesRight } from "react-icons/fa6";
import { quiz } from "./questions.js";

function App() {
  const [name, setName] = useState("");
  const [createdUser, setCreatedUser] = useState("");
  const [showSection, setShowSection] = useState(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [step, setStep] = useState(0);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [categories, setCategories] = useState([
    { id: 1, name: "Movies" },
    { id: 2, name: "Farming" },
    { id: 3, name: "Culture" },
    { id: 4, name: "History" },
  ]);
  const [questions, setQuestions] = useState(null);

  useEffect(() => {
    if (selectedTopic) {
      console.log("pappu paas ho gya");
      const temp = quiz.find((obj) => obj.category === selectedTopic);
      setQuestions(temp.questions);
    }
  }, [selectedTopic]);

  function handleCreateUser() {
    if (name.trim()) {
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

              {/* <div
                className={`category ${
                  selectedTopic === "Farming" ? "selected" : ""
                }`}
                onClick={() => handleTopicSelect("Farming")}
              >
                Farming
              </div>
              <div
                className={`category ${
                  selectedTopic === "Sport" ? "selected" : ""
                }`}
                onClick={() => handleTopicSelect("Sport")}
              >
                Sport
              </div>
              <div
                className={`category ${
                  selectedTopic === "Movie" ? "selected" : ""
                }`}
                onClick={() => handleTopicSelect("Movie")}
              >
                Movie
              </div>
              <div
                className={`category ${
                  selectedTopic === "History" ? "selected" : ""
                }`}
                onClick={() => handleTopicSelect("History")}
              >
                History
              </div> */}
            </div>
            <button className="Start-btn" onClick={beginQuiz}>
              Start
            </button>
          </div>
        )}

        {step === 2 && selectedTopic && (
          <div className="quiz-page">
            <h2>{selectedTopic} Quiz</h2>
            <p>Q1: Sample Question for {selectedTopic}</p>
            {questions &&
              questions.map((obj) => {
                return (
                  <>
                    <h2>{obj.q}</h2>
                    <div className="options">
                      {obj.options.map((option, index) => (
                        <p className="option" key={index}>
                          {option}
                        </p>
                      ))}
                    </div>
                  </>
                );
              })}
          </div>
        )}
      </div>
    </>
  );
}
export default App;
