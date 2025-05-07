
import { useState } from 'react';
import './App.css';
import image1 from './img/image.png';
import { FaAnglesRight } from 'react-icons/fa6';

function App() {
  const [name, setName] = useState("");
  const [createdUser, setCreatedUser] = useState("");
  const [showSection, setShowSection] = useState(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

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
      setShowSection("quiz");
    } else {
      setMessage("Please Create a User First");
      setMessageType("error");
      setTimeout(() => {
        setMessage("");
        setMessageType("");
      }, 2000);
    }
  }

  return (
    <>
      <div className='header'>
        <div className='pop'>
          <h1>Quiz</h1>
        </div>
        
          
          <div className='start'>
          {!createdUser ? (
            <button onClick={() => setShowSection("form")}>Create User</button>
          ) : (
            <button onClick={() => setShowSection("form")}>{createdUser}</button>
          )}
        </div>
       
      </div>

      <div className='parent'>

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
          <div className='input'>
            <label>User Name:</label><br />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='Enter your name'
            /><br />
            <div className='Create'>
              <button className='Next' onClick={handleCreateUser} style={{ backgroundColor: "black", color: "white" }}>Create</button>
              <button className='Quit' onClick={() => setShowSection(null)} style={{ backgroundColor: "red", color: "white" }}>Quit</button>
            </div>
          </div>
        )}

        {showSection === "quiz" && createdUser && (
          <div className="output">
            <h1>Welcome, {createdUser}!</h1>
            <p className="choose-category">Select a Quiz Category:</p>
    <div className="categories">
      <div className="category">Farming</div>
      <div className="category">Sport</div>
      <div className="category">Movie</div>
      <div className="category">History</div>
    </div>
          </div>
        )}

        <div className='username'>
          <div className='text'>
            <h1>Take Your <span>Knowledge</span> to the Next Level</h1>
            <div className='Start'>
              <button onClick={startQuiz}>Start Quiz <FaAnglesRight /></button>
            </div>
          </div>
          <div className='img'>
            <img src={image1} alt="Quiz Illustration" />
            
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
