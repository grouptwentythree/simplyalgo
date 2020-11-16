import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react'

function App() {

  const [apiResponse, setAPIResponse] = useState('')


  function callAPI() {
    fetch("http://localhost:9000/testAPI")
        .then(res => res.text())
        .then(res => setAPIResponse(res));
  }

  useEffect(() => {
    callAPI();
  });

  return (
    <div className="App">
      <h2> grouptwentythree - Alex, Kevin, David</h2>
      <p>{apiResponse}</p>
    </div>
  );
}

export default App;
