import React from "react";
import "./navbar.sass";
//modueles
import { useHistory } from "react-router-dom";
//componentss
import { useStateValue } from "../../helpers/stateProvider";

function Navbar() {
  //init
  const [{ user }] = useStateValue();
  let history = useHistory();
  //globalstates

  return (
    <main className="navbar">
      <div className="nav-left">
        <div className="logo">LOGO</div>
        <div className="nav-search">
          <div className="search-icon"></div>
          <input type="text" placeholder="Search"></input>
        </div>
      </div>
      <div className="nav-control">
        <div className="icon"></div>
        <div className="icon"></div>
        <div
          onClick={() => {
            history.push(`/user/${user}`);
          }}
          className="user-icon"
        />
      </div>
    </main>
  );
}

export default Navbar;
