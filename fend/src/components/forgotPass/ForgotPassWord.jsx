import React, { useState } from "react";
import "./forgotpassword.css";
import {  useNavigate } from "react-router-dom";
import axios from "axios";

export default function ForgotPassWord() {
  const [showEmail, setShowEmail] = useState(true);

  const navigate=useNavigate();
  const [fpOtp, setFpOtp] = useState();
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [email, setEmail] = useState("");

  const [error, setError] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/otp-manager",
        {
          email,
        }
      );
      res.data && setShowEmail(false);
    } catch (err) {
      setError(true);
    }
  };

  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    if (password !== confirmpassword) {
      setError(true);
      return;
    }
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/verificatio-otp",
        {
          password: confirmpassword,
          otp: fpOtp,
        }
      );
      if (res.data.code === 200){
        alert("password apdate successful")
              navigate('/')
      }else{
        setError(true);
      }
      
    } catch (err) {
      setError(true);
    }
  };

  return (
    
    <>
    
      {showEmail ? (
        <div className="register">
          <span className="registerTitle">Reset PassWord</span>
          <form className="registerForm" onSubmit={handleSubmit}>
            <label>Email </label>
            <input
              type="email"
              className="registerInput"
              required
              placeholder="Enter your Id..."
              onChange={(e) => setEmail(e.target.value)}
            />

            <button
              onClick={handleSubmit}
              className="registerbutton"
              type="submit"
            >
              Submit Email
            </button>
          </form>
          {error && (
            <span style={{ color: "red", marginTop: "10px" }}>
              Something went wrong!
            </span>
          )}
        </div>
      ) : (
        // verification otp section
        <div className="register">
          <span className="registerTitle">Reset PassWord</span>
          <form className="registerForm" onSubmit={handleOTPSubmit}>
            <label>Enter OTP </label>
            <input
              type="text"
              className="registerInput"
              required
              placeholder="Enter your OTP..."
              onChange={(e) => setFpOtp(e.target.value)}
            />
            <label>Enter PassWord</label>
            <input
              type="password"
              className="registerInput"
              placeholder="Enter your password ..."
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Confirm Password</label>
            <input
              type="password"
              className="registerInput"
              placeholder="Enter your Password..."
              required
              onChange={(e) => setConfirmpassword(e.target.value)}
            />
            <button className="registerbutton" type="submit">
              Reset PassWord
            </button>
          </form>
          {error && (
            <span style={{ color: "red", marginTop: "10px" }}>
              Something went wrong!
            </span>
          )}
        </div>
      )}
    </>
  );
}
