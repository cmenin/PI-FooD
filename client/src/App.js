import './App.css';
// import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';

function App() {
  console.log("EN EL APP")
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path= "/" component={Home}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
