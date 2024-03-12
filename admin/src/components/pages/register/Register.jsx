import React, { useState } from 'react'
import "./register.css"
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function Register() {
 
  const[username,setUsername]=useState("")
  const[password,setPassword]=useState("")
  const[address,setAddress]=useState("")
  const[email,setEmail]=useState("")

  const [error,setError]=useState(false)
  const handleSubmit = async(e) =>{
    e.preventDefault();
    setError(false);
    try{
      const res = await axios.post("http://localhost:5000/api/auth/register",{
        username,
        password,
        address,
        email,
       });
       res.data && window.location.replace("/")
    }catch(err){
      
      setError(true);
    }
       
  };
  return (
    <div className='register'>
        <span className="registerTitle">Register</span>
        <form  className="registerForm" onSubmit={handleSubmit}>
       
            <label>Name </label>
            <input type='text' className='registerInput' placeholder='Enter your Name ...' onChange={e=>setUsername(e.target.value)}/>
            <label>Email</label>
            <input type='email' className='registerInput' placeholder='Enter your Email id...' onChange={e=>setEmail(e.target.value)}/>
            <label>Address </label>
            <input type='text' className='registerInput' placeholder='Enter your Address...' onChange={e=>setAddress(e.target.value)}/>
            <label>Password</label>
            <input type='password' className='registerInput' placeholder='Enter your Password...'onChange={e=>setPassword(e.target.value)}/>
            <button className="registerbutton" type='submit'>Register</button>
        </form>
        {/* <button className="registerLoginbutton"><Link className='link' to="/">Login</Link></button> */}
        {error && <span style={{color:"red",marginTop:"10px"}}>Something went wrong!</span>}
    </div>
  )
}
