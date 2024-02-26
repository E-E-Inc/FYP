import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import BackButton from "./backButton";
import axios from "axios";
import { Grid, TextField, Button } from "@mui/material";

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
      return;
    }

    if (!validateEmail(email)) {
      setEmailError(true);
      return;
    }

    if (password.length < 6) {
      setPasswordError(true);
      return;
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
      <form style={{ justifyContent: "flex-start" }}>
        <Grid
          container
          spacing={1}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          {/* Username grid */}
          <Grid item xs={24}>
            <Grid item xs={12}>
              <label className="page-label">
                Email
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="page-input"
                />
              </label>
            </Grid>
            <Grid item xs={12}>
              {emailError && (
                <label className="error-label">
                  Please enter a valid email
                </label>
              )}
            </Grid>
          </Grid>

          {/* Password Grid */}
          <Grid item xs={24}>
            <Grid item xs={11.7}>
              {" "}
              <label className="page-label">
                Password
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="page-input"
                />
              </label>
            </Grid>
            <Grid item xs={11.7}>
              {" "}
              {passwordError && (
                <label className="error-label">
                  Password must be 6 charachters long
                </label>
              )}
            </Grid>
          </Grid>

          <Grid item xs={12} justifyContent="flex-start">
            <button onClick={handleRegister} className="send-button">
              Sign Up
            </button>
            <br />

            {noDataError && (
              <label className="error-label">
                {" "}
                Please enter both an email address and password
              </label>
            )}

            {SignUpError && (
              <label className="error-label">
                Sign Up unsuccessful. Please check your credentials.
              </label>
            )}

            {dupEmailError && (
              <label className="error-label"> Email already exists</label>
            )}
          </Grid>
        </Grid>
      </form>
    </div>
  );
};
export default SignUp;
