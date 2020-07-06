import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./components/home";
import Collections from "./components/collections";
import NewCollection from "./components/new-collection";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/collections">
            <Collections />
          </Route>
          <Route path="/newcollection">
            {console.log("HOI ?")}
            <NewCollection />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
