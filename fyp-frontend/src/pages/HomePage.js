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
        "https://fyppython-production.up.railway.app/logout",
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
      } else {
        console.error("Logout failed with status: ", response.status);
      }
    } catch (error) {
      console.error("Error logging out", error);
    }
  };

  return (
    console.log("Rendering HomePage"),
    console.log(
      "UID is: ",
      localStorage.getItem("uid"),
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
    )
  );
};
export default HomePage;
