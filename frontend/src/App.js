import logo from './logo.svg';
import './App.css';

function App() {
  // Make sure Express app is runnin on port 3003
  const API_BASE = 'http://localhost:3003';
  fetch(API_BASE)
    .then(res => res.json())
    .then(j => console.log(j));

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
