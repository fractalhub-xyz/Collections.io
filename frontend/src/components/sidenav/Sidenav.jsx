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
          <div className="icon">IC</div>
          <div className="link">Home</div>
        </div>
        <div className="gap" />
        <div className="nav-button active">
          <div className="icon">IC</div>
          <div className="link">Explore</div>
        </div>
        <div className="gap" />
        <div className="nav-button">
          <div className="icon">IC</div>
          <div className="link">Placehodler</div>
        </div>
      </div>
    </main>
  );
}

export default Sidenav;
