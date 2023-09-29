
import './App.css';
import { Routes } from './Routes';
import RenderTree from './RenderTrees';
function App() {
  return (
    <div className="App">
      <header className="App-header">
       
       <Routes/>
        <RenderTree></RenderTree>
      </header>
    </div>
  );
}

export default App;
