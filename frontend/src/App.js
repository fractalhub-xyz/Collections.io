import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Login from "./components/loginPage/login";
import Home from "./components/homePage/home";
import Detail from "./components/detailPage/detail";
import User from "./components/userPage/user";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact>
            <Login />
          </Route>
          <Route path="/home" exact>
            <Home />
          </Route>
          <Route path="/detail/:id">
            <Detail />
          </Route>
          <Route path="/user/:id">
            <User />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
