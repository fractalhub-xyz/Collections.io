import React from "react";
import "./navbar.sass";
//componentss
import { useStateValue } from "../../helpers/stateProvider";

function Navbar() {
  //globalstates
  const [{ user }, dispatch] = useStateValue();

  return (
    <main className="navbar">
      <div className="user"> {user}</div>
      <div className="user-icon" />
    </main>
  );
}

export default Navbar;
