import Image from "next/image";
import { useEffect, useState } from "react";
import quotes from "./data";
function Profile({user,image,email,log}:any) {
//show random quote in user profile
const [random,setRandom]=useState(0)
useEffect(() => {
  setRandom(Math.floor(Math.random() * quotes.length-1))
}, []);

  const showRandomQuote=()=>{
    setRandom(Math.floor(Math.random() * quotes.length-1))
  }
  return (
    <div >
<div className="wrapper">
  <div className="top-icons">
    <i className="fas fa-long-arrow-alt-left"></i>
    <i className="fas fa-ellipsis-v"></i>
    <i className="far fa-heart"></i>
  </div>
  
  <div className="profile">
    <img src={image} className="thumbnail"></img>
    <div className="check"><i className="fas fa-check"></i></div>
    <h3 className="name">Welcome back {user}</h3>
    <p className="title">{email}</p>
    <p className="description"></p>
    <button type="button" className="btn" onClick={()=>{return showRandomQuote()}}>Quote</button>
  </div>
  
  <div className="social-icons">
    hello there! we hope that you liked our app so 
    feel free if you want to update your account this is the quote of today!:
    
 {quotes[random]}

  
</div>

<div id="container" onClick={()=>{
  return log()
}}>
  <button className="face-button">
    <span className="face-container">
      <span className="eye left"></span>
      <span className="eye right"></span>
      <span className="mouth"></span>
    </span>
  </button>
  </div>
</div>


    </div>
  );
}
export default Profile;
