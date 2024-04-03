import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { UserContext } from "./pages/UserContext";
import React, { useContext } from "react";

// Import components without curly braces
import Base from "./pages/BasePage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import CapturePicturePage from "./pages/CapturePicturePage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [uid, setUid] = useState(null); // Define uid and setUid here
  console.log("App.js uid: ", uid);
  return (
    <div className="App">
      <header className="App-header">
        <UserContext.Provider value={{ uid, setUid }}>
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
        </UserContext.Provider>
      </header>
    </div>
  );
}

export default App;
