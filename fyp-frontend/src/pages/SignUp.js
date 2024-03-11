import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import BackButton from "./backButton";
import axios from "axios";
import { Grid, TextField, Button } from "@mui/material";
import Modal from "react-modal";

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

  const [age, setAge] = useState(null);
  const [gender, setGender] = useState(null);
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  // Function to validate email format
  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  // Method for closing modal for user input
  const openModal = () => {
    setModalIsOpen(true);
  };

  // Method for closing modal for user input
  const closeModal = () => {
    history.push("/Login");
    setModalIsOpen(false);
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
      setModalIsOpen(true);
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

  const handleUpdateUserInfo = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to your backend for sign-up
      const response = await axios.post("http://localhost:5000/update_info", {
        gender,
        age,
        email,
        height,
        weight,
      });
      history.push("/Login");
    } catch (error) {
      console.error("Registration failed:", error);
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

            {/* Grid for Modal */}
            <Modal
              isOpen={modalIsOpen}
              onClose={closeModal}
              style={{
                overlay: {
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                },
                content: {
                  position: "relative",
                  top: "auto",
                  left: "auto",
                  right: "auto",
                  bottom: "auto",
                  borderRadius: "10px",
                },
              }}
            >
              <form>
                <div style={{ marginBottom: "10px" }}>
                  <input
                    type="text"
                    placeholder="Gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  />
                </div>
                <div style={{ marginBottom: "10px" }}>
                  <input
                    type="number"
                    placeholder="Age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </div>
                <div style={{ marginBottom: "10px" }}>
                  <input
                    type="text"
                    placeholder="Weight"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                  />
                </div>
                <div style={{ marginBottom: "10px" }}>
                  <input
                    type="decimal"
                    placeholder="Height"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                  />
                </div>
                <button type="button" onClick={handleUpdateUserInfo}>
                  Add Information
                </button>
              </form>
            </Modal>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};
export default SignUp;
