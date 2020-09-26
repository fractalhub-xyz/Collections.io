import React, { useState } from "react";
import "./sidenav.sass";
//icons
import { Home, Explore } from "@material-ui/icons";
//modules
import { useHistory } from "react-router-dom";
import { useStateValue } from "../../helpers/stateProvider";

function Sidenav() {
  //init
  const [{ isDesktop }] = useStateValue();

  let history = useHistory();
  const [activeUrl, setActiveUrl] = useState(window.location.pathname);
  console.log(activeUrl);

  return (
    <main className="side-nav">
      {isDesktop ? (
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
        </div>
      ) : null}
    </main>
  );
}

export default Sidenav;
