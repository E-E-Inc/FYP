import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import BackButton from "./backButton";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleLogin = async (e) => {
    console.log("Inside handleLogin");
    e.preventDefault();
    try {
      console.log("inside try");
      // Send a POST request to your backend for login
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });
      console.log(response);
      // Handle successful login (e.g., navigate to another page)
      history.push("/Home");
      console.log("here girl");
    } catch (error) {
      console.error("Login failed:", error);
      console.log("fail girl");

      // Handle login failure (e.g., display error message)
    }
  };

  return (
    <div style={{ color: "black" }}>
      <BackButton />
      <form>
        <label className="page-label">
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="page-input"
          />
        </label>
        <br />
        <label className="page-label">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="page-input"
          />
        </label>

        <button onClick={handleLogin} className="send-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
