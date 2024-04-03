import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { useEffect, useState } from "react";
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

function ProtectedRoute({ component: Component, hasUid, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        hasUid ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}

function App() {
  const [uid, setUid] = useState(localStorage.getItem("uid") || null);
  const [hasUid, setHasUid] = useState(uid !== null);

  const forgetUid = () => {
    setUid(null);
    localStorage.removeItem("uid");
  };

  useEffect(() => {
    setHasUid(uid !== null);
    if (uid !== null) {
      localStorage.setItem("uid", uid);
    } else {
      localStorage.removeItem("uid");
    }
  }, [uid]);

  console.log("App.js uid: ", uid);

  return (
    <div className="App">
      <header className="App-header">
        <UserContext.Provider value={{ uid, setUid, forgetUid }}>
          <Router>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
            <Route path="/home" component={HomePage} />
            <Route path="/dashboard" component={Dashboard} />
            {/* <ProtectedRoute
              path="/CapturePicturePage"
              component={CapturePicturePage}
            /> */}
            <Route path="/CapturePicturePage" component={CapturePicturePage} />
            <Route path="/base" component={Base} />
            {/* Redirect from root */}
            <Redirect from="/" to={hasUid ? "/home" : "/base"} />
          </Router>
        </UserContext.Provider>
      </header>
    </div>
  );
}

export default App;
