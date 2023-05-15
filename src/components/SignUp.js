import React, { useEffect, useState } from "react";
import logo from "../img/logo.png";
import "./SignUp.css";
import { Link, useNavigate } from "react-router-dom";

import { toast } from 'react-toastify';


export default function SignUp() {
  const navigate = useNavigate()
  const [name, setName] = useState("");
  const [email, setEmail] = useState("")
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")

  // Toast functions
  const notifyA = (msg) => toast.error(msg)
  const notifyB = (msg) => toast.success(msg)

  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const postData = () => {
    //checking email
    if (!emailRegex.test(email)) {
      notifyA("Invalid email")
      return
    }
    // Sending data to server
    fetch("http://127.0.0.1:5000/api/auth/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        username: userName,
        email: email,
        password: password

      })
    }).then(res => res.json())
      .then(data => {
        if (data.error) {
          notifyA(data.error)
        } else {
          notifyB(data.message)
          navigate("/signin")
        }
        console.log(data)
      })
  }

  return (

    <div className="signup">
  <div className="signup-header">
    <img className="signup-logo" src={logo} alt="Logo" />
    <h1 className="signup-title">Sign up to see and upload photos from your friends</h1>
  </div>
  <div className="signup-form">
    <div className="signup-field">
      <label htmlFor="email">Email:</label>
      <input type="email" name="email" id="email" value={email} placeholder="Enter your email" onChange={(e) => { setEmail(e.target.value) }} />
    </div>
    <div className="signup-field">
      <label htmlFor="username">Username:</label>
      <input type="text" name="username" id="username" placeholder="Enter your username" value={userName} onChange={(e) => { setUserName(e.target.value) }} />
    </div>
    <div className="signup-field">
      <label htmlFor="password">Password:</label>
      <input type="password" name="password" id="password" placeholder="Enter your password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
    </div>
    <div className="signup-agreement">
      <input type="checkbox" name="terms" id="terms" />
      <label htmlFor="terms">I agree to the terms and conditions.</label>
    </div>
    <input type="submit" id="submit-btn" value="Sign Up" onClick={() => { postData() }} />
  </div>
  <div className="signup-footer">
    <p>Already have an account?</p>
    <Link to="/signin">
      <button className="signup-btn">Sign In</button>
    </Link>
  </div>
</div>

  );
}
