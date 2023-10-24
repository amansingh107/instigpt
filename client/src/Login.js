// Login.js
import React, { useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom"; // Import use


function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const navigate = useNavigate(); // Create a history object

  const login = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/login", {
      username: username,
      password: password,
    }).then((response) => {
      if (response.data.message) {
        setLoginStatus(response.data.message);
      } else {
        // Navigate to main.js or another route after successful login
        navigate("/Main");
      }
    });
  }
  return (
    <div className="loginForm">
      <form>
        <h4>Login Here</h4>
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
        <input className="button" type="submit" onClick={login} value="Login" />
        <h3> <Link to="/signup">Signup</Link></h3>
        <h1 style={{ color: 'red', fontSize: '15px', textAlign: 'center', marginTop: '20px' }}>{loginStatus}</h1>
      </form>
    </div>
  );
}

export default Login;
