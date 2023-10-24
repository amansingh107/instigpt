import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./Main";
import Login from "./Login"; // Import your login component
import Signup from "./Signup"; // Import your signup component


function App() {
  return (
    <Router>
      <div className="container">
        <h1>Message App</h1>
        <div className="row">
          <div className="col-3">
          </div>
          <div className="col-9">
          <Routes>
  <Route path="/" element={<Login />} />
  <Route path="/signup" element={<Signup />} />
  <Route path="/main" element={<Main />} />
</Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
