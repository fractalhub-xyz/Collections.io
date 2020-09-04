import React from "react";
import "./sidenav.sass";
//api
//components
//modules

function Sidenav() {
  return (
    <main className="side-nav">
      <div className="container">
        <div className="gap" />
        <div className="nav-button">
          <div className="icon"></div>
          <div className="link">Home</div>
        </div>
        <div className="gap" />
        <div className="nav-button">
          <div className="icon"></div>
          <div className="link">Home</div>
        </div>
      </div>
    </main>
  );
}

export default Sidenav;
