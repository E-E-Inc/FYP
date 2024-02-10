import * as React from "react";
import { Link } from "react-router-dom";

function Base() {
  return (
    <div>
      <h1 class="my-heading">Food Logix</h1>
      <Link to="/Auth" className="send-button">
        Get Started
      </Link>
    </div>
  );
}

export default Base;
