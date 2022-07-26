import "../styles/globals.css";
import "../styles/signup.scss";
// import "../styles/Profile.scss";
import "../styles/searchbar.scss"
import "../styles/workout.css"
import "../styles/diet_cards.css"
import "../styles/recipe.css"
import Layout from '../component/layout'
import { useState, useEffect } from "react";
import Homepage from "./index";
import axios from "axios";
import "../styles/contact.scss"
import "../styles/Profile.scss"
import "../styles/Home.css"
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
//signup and login 
  const [choose,setChoose] = useState(true)
//signup
const [name1,setName1] = useState("")
const [emails1,setEmail1] = useState("")
 const [passwords1,setPassword1] = useState("")
const [img1,setImg1] = useState("")

 const signup:any= async () =>{
try{
    await fetch("http://localhost:2000/api/user/signup",{
     method:"POST",
     headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    },
    body: JSON.stringify({email:emails1,password:passwords1,img:img1,name:name1})
    })
    
}catch (error) {
    console.log(error);
 }

 }





    //log in
    const [emails, setEmail] = useState("");
    const [passwords, setPassword] = useState("");
  
    const [curentuser, setCurrentUser] = useState("");
    const [connected, setConnected] = useState(0);
    const [img,setImg] = useState("")
    const [email,setEmai] = useState("")



    useEffect(() => {
      //get current user informations
      let connect: any = localStorage.getItem("connected");
      let loggedInUser: any = localStorage.getItem("userName");
      let useimage: any = localStorage.getItem("userImage");
      let usereamil: any = localStorage.getItem("userEmail");
  
      setCurrentUser(loggedInUser);
      setConnected(connect);
      setImg(useimage)
      setEmai(usereamil)
    }, []);
  


    //check if user logged and show home page
    const Login: any = async () => {
      const res = await axios.post("http://localhost:2000/api/user/login", {
        email: emails,
        password: passwords,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userName", res.data.userName);
      localStorage.setItem("userId", res.data.userId);
      localStorage.setItem("connected", res.data.connected);
      localStorage.setItem("userEmail", res.data.userEmail);
      localStorage.setItem("userImage", res.data.userImage);
      console.log(localStorage)
    };
  
    const Logout = () => {
      setCurrentUser("");
      setEmail("");
      setPassword("");
      setConnected(0);
      localStorage.clear();
    };
    const UserIsLogged: any = () => {
     //user is logged in
      if (connected == 200) {
        return (
          <div>
            {" "}
            <Layout>

{" "}
<Component {...pageProps} user={curentuser} image={img} email={email} log={Logout} />
           </Layout>
        
          </div>
        );
        
        //user is not logged in
      } else {
          //show  login
        if (choose===true){

        
        return (
          <div className="container">
            <div className="login-signup-cards">
              <div className="login-card">
                <div className="login-card-items">
                  <h1 className="login-tag">Log In</h1>
  
                  <form className="form-items">
                    <input
                      className="email-item"
                      type="email"
                      placeholder="E-Mail"
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
  
                    <div className="password-item">
                      <input
                        type="password"
                        placeholder="Password"
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                      />
  
                      <div className="forgot-password-item">
                        <a href="#">Forgot password?</a>
                      </div>
                    </div>
  
                    <button
                      className="button-item"
                      type="button"
                      onClick={() => {
                        return Login();
                      }}
                    >
                      Log In
                    </button>
  
                    <div className="create-account-item">
                      <a >
                        {" "}
                        Don't have an account? <span onClick={() => {
                               setChoose(false)
                        }}>Sign Up</span>
                      </a>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
        //show sign up
        else if (choose===false){
          return (  <div className="container">
          <div className="login-card">
      
            <div className="login-card-items">
      
            </div>
      
          </div>
          <div className="login-signup-cards">
          <div className="signup-card">
      
            <div className="signup-card-items">
      
              <h1 className="signup-tag">Sign Up</h1>
      
              <form className="form-items"> 
         <input className="password-item" type="text" placeholder="Name" onChange={(e)=>{
                    setName1(e.target.value);
                }} />
                 <input className="password-item" type="text" placeholder="Img" onChange={(e)=>{
                    setImg1(e.target.value);
                }} />
                <input className="email-item" type="email" placeholder="E-Mail" onChange={(e)=>{
                      setEmail1(e.target.value);
                }}/>
      
                <input className="password-item" type="password" placeholder="Password" onChange={(e)=>{
                    setPassword1(e.target.value);
                }} />
              
      
                <button className="button-item" type="button" onClick={()=>{return signup()}}>Sign Up</button>
      
                <div className="have-account-item">
      
                 <a >Have already an account? <span onClick={() => {
                               setChoose(true)
                        }}>Log In</span></a>
      
                </div>
                </form>
      
            </div>
      
          </div>
      
        </div>
     
      </div>)
        }
      }
    };

  return (
 <div>{UserIsLogged()}</div>
  );
}

export default MyApp;
