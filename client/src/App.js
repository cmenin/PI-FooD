import './App.css';
// import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import LandingPage from './components/LandingPage';
import Details from "./components/Details"

function App() {
  console.log("EN EL APP")
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path= "/" component={LandingPage}/>
        <Route exact path= "/home" component={Home}/>
        <Route exact path= "/recipe/:id" component={Details}/>

      </Switch>
    </div>
    </BrowserRouter>
    
  );
}

export default App;
