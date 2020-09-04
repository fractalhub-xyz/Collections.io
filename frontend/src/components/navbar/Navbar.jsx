import React from "react";
import "./navbar.sass";
//componentss
import { useStateValue } from "../../helpers/stateProvider";

function Navbar() {
  //globalstates
  const [{ user }, dispatch] = useStateValue();

  return (
    <main className="navbar">
      <div className="nav-left">
        <div className="logo">LOGO</div>
        <div className="nav-search">
          <div className="search-icon">o?</div>
          <input type="text" placeholder="Search"></input>
        </div>
      </div>
      <div className="nav-control">
        <div className="icon"></div>
        <div className="icon"></div>
        <div className="user-icon" />
      </div>
    </main>
  );
}

export default Navbar;
