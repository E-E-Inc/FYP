import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to your backend for login
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });
      console.log(response);
      //console.log(response.data.message);
      // Redirect to the home page or any other route after successful login
      history.push("/home");
    } catch (error) {
      console.error("Login failed:", error);
      // Handle login failure (e.g., display error message)
    }
  };

  return (
    <div style={{ color: "black" }}>
      <form>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button onClick={handleLogin}>Login</button>
      </form>
    </div>
  );
};

export default Login;
