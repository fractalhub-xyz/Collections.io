import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Login from "./components/loginPage/login";
import Home from "./components/homePage/home";
import Detail from "./components/detailPage/detail";
import User from "./components/userPage/user";
import SnippetDetail from "./components/detailPage/snippetdetail";
import Tag from "./components/tagPage/tag";

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
          <Route path="/detail/:id" exact>
            <Detail />
          </Route>
          <Route path="/user/:id">
            <User />
          </Route>
          <Route path="/tag/:tag">
            <Tag />
          </Route>
          <Route path="/detail/:id/:snip" exact>
            <SnippetDetail />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
