import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import BackButton from "./backButton";

const AuthPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  return (
    <div style={{ color: "black" }}>
      <BackButton />
      <form>
        <label className="page-label">
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
        <br />
        <br />
        <Link to="/Home" className="send-button">
          Login
        </Link>
        <Link to="/Home" className="send-button">
          Sign Up
        </Link>
      </form>
    </div>
  );
};
export default AuthPage;
