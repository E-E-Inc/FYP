import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Import components without curly braces
import Home from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import CapturePicturePage from './pages/CapturePicturePage';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/Login" component={LoginPage} />
            <Route path="/SignUp" component={SignUp} />
            <Route path="/Dashboard" component={Dashboard} />
            <Route path="/CapturePicturePage" component={CapturePicturePage} />
          </Switch>
        </Router>
      </header>
    </div>
  );
}

export default App;
