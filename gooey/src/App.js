import logo from './logo.svg';
import './App.css';

import Title from './components/Title';
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
      <Title></Title>
      <p>{apiResponse}</p>

    </div>
  );
}

export default App;
