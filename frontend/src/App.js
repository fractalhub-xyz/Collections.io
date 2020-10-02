import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
// import { ToastsContainer, ToastsStore } from "react-toasts";

import Login from "./components/login/Login";
import Navbar from "./components/navbar/Navbar";
import SideNav from "./components/sidenav/Sidenav";
import Home from "./components/home/Home";
import Explore from "./components/explore/Explore";
import Collection from "./components/collection/Collection";
import Snippet from "./components/snippet/Snippet";
import User from "./components/user/User";
import Modal from "./components/common/Modal";
import Notifications from "./components/notifications/Notifications";
import Tag from "./components/tag/Tag";
import Search from "./components/search/Search";

function AuthenticatedRoutes() {
  return (
    <>
      <Navbar />
      <Modal />
      <SideNav />
      <Switch>
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
        <Route path="/notifications" exact>
          <Notifications />
        </Route>
        <Route path="/tag/:id">
          <Tag />
        </Route>
        <Route path="/user/:username">
          <User />
        </Route>
        <Route path="/search/:search">
          <Search />
        </Route>
      </Switch>
    </>
  );
}

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Login />
        </Route>
        <Route path="/">
          <AuthenticatedRoutes />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
