import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import BackButton from "./backButton";
import axios from "axios";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to your backend for sign-up
      const response = await axios.post("http://localhost:5000/register", {
        email,
        password,
      });
      // Handle successful sign-up (e.g., display success message)
      console.log("here girl");
      // Redirect to the login page
      history.push("/Login");
    } catch (error) {
      console.error("Sign-up failed:", error);
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

        <button onClick={handleRegister} className="send-button">
          Sign Up
        </button>
      </form>
    </div>
  );
};
export default SignUp;
