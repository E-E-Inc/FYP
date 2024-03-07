import React from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div>
      <Link to="/CapturePicturePage" className="send-button">
        Capture Picture
      </Link>
      <Link to="/Dashboard" className="send-button">
        Calorie Dashboard
      </Link>
      <Link to="/add" className="send-button">
        Add Food Manually
      </Link>
    </div>
  );
};
export default LoginPage;
