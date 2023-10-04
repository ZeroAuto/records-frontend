import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import React, {useEffect, useState} from 'react';

function App() {
  const [records, setRecords] = useState([])

  useEffect(() => {
    getRecords();
  }, []);

  const getRecords = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/record');
      setRecords(response.data);
    } catch {
      console.log('failed');
    }
  }

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
