import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Login from "./components/login";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <h1>Collections.io</h1>
        <Switch>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
