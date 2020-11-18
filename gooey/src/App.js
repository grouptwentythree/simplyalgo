import './App.css';
import Title from './components/Title';
import React, {useState, useEffect} from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import QueryPage from './components/queryPage';


function App() {

  const [apiResponse, setAPIResponse] = useState('')

  // frontend interaction (button press, enterinout) ==> backend ==> sql and returns something ==> render something to frontend 
  // example call to backend 
  function callAPI() {
    fetch("http://localhost:9000/testAPI")  
        .then(res => res.text())
        .then(res => setAPIResponse(res));
  }

  
  useEffect(() => {
    callAPI();
  });

  return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={ Title } />
          <Route path='/validated' exact component ={ QueryPage } />
          <Route path="/" render={()=> <div><h2> 404 </h2></div>} />
        </Switch>
      </BrowserRouter>
  );
}

export default App;
