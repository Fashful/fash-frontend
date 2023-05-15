import React, { useState, useContext } from "react";
import "./SignIn.css";
import logo from "../img/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { LoginContext } from "../context/LoginContext";

export default function SignIn() {
  const { setUserLogin } = useContext(LoginContext)
  const navigate = useNavigate();
  const [email, setEmail] = useState("")
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
    fetch("http://127.0.0.1:5000/api/auth/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password

      })
    }).then(res => res.json())
      .then(data => {
        if (!data.success) {
          notifyA(data.text.error)
        } else {
          notifyB("Signed In Successfully")
          console.log(data)
          localStorage.setItem("jwt", data.data.access_token)
          localStorage.setItem("user", JSON.stringify(data.data.user))

          setUserLogin(true)
          navigate("/")
        }
        console.log(data)
      })
  }

  return (

<div className="signIn">
<div className="signIn__wrapper">
  <h1 className="signIn__heading">Welcome back to Fashful!</h1>
  <form className="signIn__form">
    <div className="signIn__inputContainer">
      <label htmlFor="email" className="signIn__label">
        Email address or username:
      </label>
      <input
        type="email"
        name="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="signIn__input"
        required
      />
    </div>
    <div className="signIn__inputContainer">
      <label htmlFor="password" className="signIn__label">
        Password:
      </label>
      <input
        type="password"
        name="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="signIn__input"
        required
      />
    </div>
    <button type="submit" className="signIn__button">
      Sign In
    </button>
  </form>
  <p className="signIn__newAccount">
    Forgot your password or don't have an account?{" "}
    <Link to="/signup" className="signIn__link">
      Create one now.
    </Link>
  </p>
</div>
</div>

  );
}
