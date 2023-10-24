// Signup.js
import React, { useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";


function Signup() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [registerStatus, setRegisterStatus] = useState("");

  const register = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/register", {
      email: email,
      username: username,
      password: password,
    }).then((response) => {
      if (response.data.message) {
        setRegisterStatus(response.data.message);
      } else {
        setRegisterStatus("ACCOUNT CREATED SUCCESSFULLY");
      }
    });
  }

  return (
    <div className="loginForm">
      <form>
        <h4>Register Here</h4>
        <label htmlFor="email">Email Address*</label>
        <input
          className="textInput"
          type="text"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your Email Address"
          required
        />
        <label htmlFor="username">Username*</label>
        <input
          className="textInput"
          type="text"
          name="username"
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your Username"
          required
        />
        <label htmlFor="password">Password*</label>
        <input
          className="textInput"
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your Password"
          required
        />
        <input className="button" type="submit" onClick={register} value="Create an account" />
        <Link to="/">Login</Link>
        <h1 style={{ fontSize: '15px', textAlign: 'center', marginTop: '20px' }}>{registerStatus}</h1>
      </form>
    </div>
  );
}

export default Signup;
