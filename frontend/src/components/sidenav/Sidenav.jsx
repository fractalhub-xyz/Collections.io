import React, { useState } from "react";
import "./sidenav.sass";
//icons
import { Home, Explore, Add, Notifications } from "@material-ui/icons";
//modules
import { useHistory } from "react-router-dom";
import { useStateValue } from "../../helpers/stateProvider";

function Sidenav() {
  //init
  const [, dispatch] = useStateValue();

  let history = useHistory();
  const [activeUrl, setActiveUrl] = useState(window.location.pathname);
  console.log(activeUrl);

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
          className="navbtn center"
          onClick={() => {
            history.push(`/notifications/`);
          }}
        >
          <Notifications />
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

export default Sidenav;
