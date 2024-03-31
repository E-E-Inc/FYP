import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Redirect } from "react-router-dom";
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
      try {
        const response = await axios.post("http://localhost:5000/", {
          withCredentials: true,
        });
        console.log(response);
        if (response.status === 200) {
          setIsLoggedIn(true);
          localStorage.setItem("isLoggedIn", true);
          localStorage.setItem("uid", response.data.uid);
        }
      } catch (error) {
        setIsLoggedIn(false);
        localStorage.removeItem("isLoggedIn");
      }
    };
    console.log("Checking login status", isLoggedIn);
    checkLoginStatus();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Switch>
            <Route path="/" exact>
              {isLoggedIn ? <Redirect to="/Home" /> : <Base />}
            </Route>

            {/* <Route path="/Welcome" component={Base} /> */}
            <Route path="/Login" component={Login} />
            <Route path="/SignUp" component={SignUp} />
            <Route path="/Home" component={HomePage} />
            <Route path="/Dashboard" component={Dashboard} />
            <Route path="/CapturePicturePage" component={CapturePicturePage} />
          </Switch>
        </Router>
      </header>
    </div>
  );
}

export default App;
