import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
// import { ToastsContainer, ToastsStore } from "react-toasts";

import Login from "./components/login/Login";
import Home from "./components/home/Home";
import Explore from "./components/explore/Explore";
import Collection from "./components/collection/Collection";
import Snippet from "./components/snippet/Snippet";
import User from "./components/user/User";
/*
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact>
            <Login />
          </Route>
        </Switch>

        <SideNav />

        <Switch>
          <Route path="/home" exact>
            <Home />
          </Route>
          <Route path="/explore" exact>
            <Explore />
          </Route>
          <Route path="/notifications" exact>
            <Notifications />
          </Route>
          <Route path="/detail/:id" exact>
            <Detail />
          </Route>
          <Route path="/user/:username">
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

      <ToastsContainer store={ToastsStore} />
    </div>
  );
} */

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/home" exact>
          <Home />
        </Route>
        <Route path="/explore" exact>
          <Explore />
        </Route>
        <Route path="/collection/:id" exact>
          <Collection />
        </Route>
        <Route path="/snippet/:id" exact>
          <Snippet />
        </Route>
        <Route path="/user/:username" exact>
          <User />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
