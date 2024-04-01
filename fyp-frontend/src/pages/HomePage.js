import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";

const HomePage = () => {
  const history = useHistory();

  const logout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/logout",
        {},
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("uid");
        console.log("Logged out");
        history.push("/base");
      }
    } catch (error) {
      console.error("Error logging out", error);
    }
  };

  return (
    <div>
      <button onClick={logout} className="back-button">
        <BiArrowBack />
      </button>
      <Link to="/CapturePicturePage" className="send-button">
        Capture Picture
      </Link>
      <Link to="/Dashboard" className="send-button">
        Calorie Dashboard
      </Link>
    </div>
  );
};
export default HomePage;
