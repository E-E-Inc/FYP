import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import BackButton from "./backButton";
import axios from "axios";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  // State variable for displaying error
  const [noDataError, setNodataError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [SignUpError, setSignUpError] = useState(false);
  const [dupEmailError, setDupEmailError] = useState(false);

  // Function to validate email format
  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // Reset the states
    setNodataError(false);
    setEmailError(false);
    setPasswordError(false);
    setSignUpError(false);
    setDupEmailError(false);

    // Validation
    if (!email || !password) {
      setNodataError(true);
    }

    if (!validateEmail(email)) {
      setEmailError(true);
    }

    if (password.length < 6) {
      setPasswordError(true);
    }

    // Dont display the no data error if there a email & password error already displaying
    if (emailError && passwordError) {
      setNodataError(false);
    }

    try {
      // Send a POST request to your backend for sign-up
      const response = await axios.post("http://localhost:5000/register", {
        email,
        password,
      });
      history.push("/Login");
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.error === "Email already exists"
      ) {
        setDupEmailError(true);
        console.log("HERE");
      } else {
        console.error("Registration failed:", error);
      }
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

        {emailError && (
          <label className="error-label"> Please enter a valid email</label>
        )}
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

        {passwordError && (
          <label className="error-label">
            Password must be 6 charachters long
          </label>
        )}

        {noDataError && (
          <label className="error-label">
            {" "}
            Please enter both an email address and password
          </label>
        )}
        <br />

        <button onClick={handleRegister} className="send-button">
          Sign Up
        </button>

        {SignUpError && (
          <label className="error-label">
            Sign Up unsuccessful. Please check your credentials.
          </label>
        )}

        {dupEmailError && (
          <label className="error-label"> Email already exists</label>
        )}
      </form>
    </div>
  );
};
export default SignUp;
