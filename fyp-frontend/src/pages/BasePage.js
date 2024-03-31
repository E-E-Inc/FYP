import * as React from "react";
import { Link } from "react-router-dom";

function Base() {
  return (
    <div>
      <h1 class="my-heading">Food Logix</h1>
      <Link to="/SignUp" className="send-button">
        Sign Up
      </Link>
      <Link to="/login" className="send-button">
        Login
      </Link>
    </div>
  );
}

export default Base;
