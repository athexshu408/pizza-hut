import React, { useContext } from 'react'
import "./login.css"
import { Link } from 'react-router-dom'
import { useRef } from "react";
import { Context } from '../context/Context';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function Login() {

    const userRef = useRef();
    const passwordRef = useRef();
    const { dispatch, isFecthing} = useContext(Context);
    const navigate = useNavigate();      

    const handleSubmit = async (e) => {
      e.preventDefault();
                              
      
      
  
      dispatch({ type: "LOGIN_START" });
  
      try {
        
        const res = await axios.post("http://localhost:5000/api/auth/login", {
          email: userRef.current.value,
          password: passwordRef.current.value,
        });
  
      
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
         navigate("/home")
        
      } catch (err) {
       
        dispatch({ type: "LOGIN_FAILURE" });
      }
    };
   
  
  return (
    <div className='login'>
        <span className="loginTitle">Login</span>
        <form  className="loginForm" onSubmit={handleSubmit}>
            <label>Username</label>
            <input type='text' required className='loginInput' placeholder='Enter your username...' ref={userRef}/>
            <label>Password</label>
            <input type='password' required className='loginInput' placeholder='Enter your Password...'ref={passwordRef}/>
            <label style={{cursor:'pointer'}}><Link to="/forgotpass" className='link'> Forgot Password ?</Link></label>
            <button className="loginbutton" type='submit' disabled={isFecthing}>Login</button>
        </form>
        <button className="loginRegisterbutton">
      <Link className='link' to="/register">Register</Link>  
          </button>
    </div>
  )
}
