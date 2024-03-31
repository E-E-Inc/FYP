import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Grid } from "@mui/material";
import BackButton from "./backButton";

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

  // Method for sending a post request to /login to login a user
  const handleLogin = async (e) => {
    e.preventDefault();

    // Resetting states
    setLoginError(false);
    setNodataError(false);
    setEmailError(false);
    setPasswordError(false);

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
      // Send a POST request to your backend for login
      const response = await axios.post(
        "http://localhost:5000/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      console.log(response);
      setLoginError(false);
      // Redirect to the home page or any other route after successful login
      history.push("/home");
    } catch (error) {
      console.error("Login failed:", error);
      if (!emailError && !passwordError) {
        setLoginError(true);
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
          {/* Username Grid */}
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
              <div style={{ height: "20px", marginBottom: "20px" }}>
                {passwordError && (
                  <label className="error-label">
                    Password must be 6 charachters long
                  </label>
                )}
              </div>
            </Grid>
          </Grid>

          <b />
          <Grid item xs={2}>
            <button
              data-testid="submit-button"
              className="send-button"
              onClick={handleLogin}
            >
              Login
            </button>
            <br />
          </Grid>

          {/* Error messages */}
          <Grid item xs={12}>
            {noDataError && (
              <label className="error-label">
                Please enter both an email address and password
              </label>
            )}
          </Grid>

          <Grid item xs={12}>
            {LoginError && (
              <label className="error-label">
                Login unsuccessful. Please check your credentials.
              </label>
            )}
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default Login;
