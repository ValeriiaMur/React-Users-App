import React from 'react';
import Register from "./components/Register";
import Login from "./components/Login"
import Users from "./components/Users"
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <div className = "login-wrap">
          <div className="login-html">
            <header>Users App</header>
              <Switch>
                <Route exact path="/" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/users" component={Users} />
              </Switch>
          </div>
        </div>
      </div>
      
    </Router>
    
  );
}

export default App;
