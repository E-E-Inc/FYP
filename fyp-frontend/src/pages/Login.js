import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  // State variable for displaying error
  const [noDataError, setNodataError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [LoginError, setLoginError] = useState(false);

  // Function to validate email format
  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // Resetting states
    setNodataError(false);
    setEmailError(false);
    setPasswordError(false);
    setLoginError(false);

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
      // Send a POST request to your backend for login
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });

      console.log(response);
      // Redirect to the home page or any other route after successful login
      history.push("/home");
    } catch (error) {
      console.error("Login failed:", error);
      
      if (!emailError) {
        if (!passwordError) {
          setLoginError(true);
          console.log("Error");
        }
      }
    }
  };

  return (
    <div style={{ color: "black" }}>
      <form style={{ justifyContent: "left" }}>
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

        <button className="send-button" onClick={handleLogin}>
          Login
        </button>

        {LoginError && (
          <label className="error-label">
            Login unsuccessful. Please check your credentials.
          </label>
        )}
      </form>
    </div>
  );
};

export default Login;
