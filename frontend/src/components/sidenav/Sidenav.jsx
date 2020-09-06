import React, { useEffect } from "react";
import "./sidenav.sass";
//api
//components
import { useStateValue } from "../../helpers/stateProvider";
//modules
import { useHistory } from "react-router-dom";

function Sidenav() {
  //init
  let history = useHistory();

  //GlobalStates
  const [{ page }] = useStateValue();

  return (
    <main className="side-nav">
      <div className="container">
        <div className="gap" />
        <div
          className={page === "home" ? "nav-button active" : "nav-button"}
          onClick={() => {
            history.push(`/home`);
          }}
        >
          <div className="icon">IC</div>
          <div className="link">Home</div>
        </div>
        <div className="gap" />
        <div
          className={page === "explore" ? "nav-button active" : "nav-button"}
          onClick={() => {
            history.push(`/explore`);
          }}
        >
          <div className="icon">IC</div>
          <div className="link">Explore</div>
        </div>
        <div className="gap" />
        <div
          className={
            page === "placeholder" ? "nav-button active" : "nav-button"
          }
          onClick={() => {
            history.push(`dunno`)
          }}
        >
          <div className="icon">IC</div>
          <div className="link">Placehodler</div>
        </div>
      </div>
    </main>
  );
}

export default Sidenav;
