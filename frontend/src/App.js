import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

import Login from "./components/login";
import Home from "./components/home";
import Collections from "./components/collections";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <h1>Collections.io</h1>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>

          <Route path="/login">
            <Login />
          </Route>

          <Route path="/collections">
            <Collections />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
