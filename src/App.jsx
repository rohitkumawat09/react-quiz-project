import { useState } from 'react'

import './App.css'
import image1 from './img/image.png';
import { FaAnglesRight } from "react-icons/fa6";

 function App(){

const [ name, setPara,]=useState("")
const [ btn, setPara2,]=useState("")
const [showText, setCount] = useState(null);
const [error, setError] = useState("");
console.log(error);

function toggle(section) {
  setCount((prevSection) => (prevSection === section ? null : section));
}

// function next(){
// setPara2  (name)

// }


function next() {
  if (name === "") {
    setError("Please enter your name"); 
    return; 
  }
  setPara2(name);
  setError(""); 
}




return(

<>

<div className='header'>

  <div className='pop'>
    <h1>Quiz</h1>
  </div>
  <div className='start'><button onClick={() => toggle("HTML")}>Create User</button></div>
</div>



<div className='parent'>
  
  <div className='input' style={{ display: showText === "HTML" ? "block" : "none" }}>
  <label htmlFor="username">User Name:</label>
  <br />
  <input type="text" value={name} onChange={(e) => setPara(e.target.value)} placeholder='Enter first name' />


<br />
    {error && <p style={{ color: "red" }}>{error}</p>} 
<div className='Create'>
<button className='Next' onClick={next}  style={{ backgroundColor: "black", color: "white" }}>Create</button>
<button className='Quit' onClick={() => toggle("HTML")}  style={{ backgroundColor: "red", color: "white" }}>Quit</button>
</div>




<h2>{btn}</h2>
  </div>
<div className='username'>


 <div className='text'>


 <h1>Take Your <span>Knowledge</span> to the Next Level</h1>

  <div className='Start'> <button>Start Quiz <FaAnglesRight /></button></div>
 </div>


  <div className='img'>
    <img src={image1} alt="" />
  </div>


</div>
</div>

</>


)





 }






 export default App

