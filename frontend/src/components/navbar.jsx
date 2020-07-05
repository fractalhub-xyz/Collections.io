import React, { useState } from "react";
import styles from "./navbar.module.css";
import { faAlignJustify, faBrain } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Navbar() {
  const [isLogged, setisLogged] = useState(true);
  return (
    <div className={styles.nav}>
      <div>
        <a>
          <FontAwesomeIcon
            icon={faBrain}
            size="xl"
            style={{ color: "white" }}
          />
        </a>
      </div>
      <a href="/">
        <FontAwesomeIcon
          icon={faAlignJustify}
          size="xl"
          style={{ color: "white" }}
        />
        <span className={styles.label}>Collections.IO</span>
      </a>
      <div>{isLogged ? <div>USER</div> : <div>Login</div>}</div>
    </div>
  );
}

export default Navbar;
