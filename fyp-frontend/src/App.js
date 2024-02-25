import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Import components without curly braces
import Base from "./pages/BasePage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import CapturePicturePage from "./pages/CapturePicturePage";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Switch>
            <Route path="/" exact component={Base} />
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
