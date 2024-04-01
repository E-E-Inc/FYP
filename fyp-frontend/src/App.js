import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

// Import components without curly braces
import Base from "./pages/BasePage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import CapturePicturePage from "./pages/CapturePicturePage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const savedLoginStatus = localStorage.getItem("isLoggedIn");
    return savedLoginStatus ? JSON.parse(savedLoginStatus) : false;
  });

  useEffect(() => {
    const checkLoginStatus = async () => {
      console.log("Checking login status", isLoggedIn);
      try {
        const response = await axios.post("http://localhost:5000/", {
          withCredentials: true,
        });
        console.log("Login response:", response);
        if (response.status === 200) {
          setIsLoggedIn(true);
          localStorage.setItem("isLoggedIn", true);
          localStorage.setItem("uid", response.data.uid);
        }
        console.log("Checking login status", isLoggedIn);
        console.log("Checking login status", response.data.uid);
      } catch (error) {
        setIsLoggedIn(false);
        localStorage.removeItem("isLoggedIn");
      }
    };
    checkLoginStatus();
  }, [isLoggedIn]); // Add isLoggedIn as a dependency

  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route path="/home" component={HomePage} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/CapturePicturePage" component={CapturePicturePage} />
          <Route path="/base" component={Base} />
          {/* Redirect from root */}
          <Redirect from="/" to={isLoggedIn ? "/home" : "/base"} />
        </Router>
      </header>
    </div>
  );
}

export default App;
