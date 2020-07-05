import React, { useState, useEffect } from "react";
import styles from "./navbar.module.css";
import { faAlignJustify, faBrain } from "@fortawesome/free-solid-svg-icons";
import { getLogout, getIsLoggedIn } from "../helpers/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Navbar() {
  const [isLogged, setisLogged] = useState(false);

  useEffect(() => {
    async function check() {
      console.log("Running...");
      try {
        await getIsLoggedIn();
        setisLogged(true);
      } catch {
        setisLogged(false);
      }
    }

    check();
  }, []);

  const handleLogout = async () => {
    try {
      await getLogout();
      setisLogged(false);
      localStorage.removeItem("logged_in_user");
    } catch {
      alert("Oops failed");
    }
  };

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
      <div>
        {isLogged ? (
          <div>{localStorage["logged_in_user"]}</div>
        ) : (
          <div>Login</div>
        )}
      </div>
      <div>{isLogged && <button onClick={handleLogout}>Logout</button>}</div>
    </div>
  );
}

export default Navbar;
