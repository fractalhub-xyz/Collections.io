import React, { useState, useEffect } from "react";
import "./sidenav.sass";
//icons
import { Home, Explore, Add, Notifications, Search } from "@material-ui/icons";
//modules
import { withRouter } from "react-router-dom";
import { useStateValue } from "../../helpers/stateProvider";

function Sidenav({ history }) {
  //init
  const [, dispatch] = useStateValue();

  const [activeUrl, setActiveUrl] = useState(window.location.pathname);

  useEffect(
    () =>
      history.listen((location) => {
        setActiveUrl(location.pathname);
      }),
    [history]
  );

  return (
    <main className="side-nav">
      <div className="container">
        <div
          className={
            activeUrl === "/home" ? "navbtn center current" : "navbtn center"
          }
          onClick={() => {
            history.push("/home");
          }}
        >
          <Home />
        </div>
        <div
          className={
            activeUrl === "/explore" ? "navbtn center current" : "navbtn center"
          }
          onClick={() => {
            history.push("/explore");
          }}
        >
          <Explore />
        </div>
        <div
          className={
            activeUrl === "/notifications"
              ? "navbtn center current"
              : "navbtn center"
          }
          onClick={() => {
            history.push(`/notifications`);
          }}
        >
          <Notifications />
        </div>
        <div
          className={
            activeUrl === "/search" ? "navbtn center current" : "navbtn center"
          }
          onClick={() => {
            history.push(`/search`);
          }}
        >
          <Search />
        </div>
        <div
          className={"navbtn center add"}
          onClick={() => {
            dispatch({
              type: "OPEN_FORM",
              form: "create_collection",
            });
          }}
        >
          <Add />
        </div>
      </div>
    </main>
  );
}

export default withRouter(Sidenav);
