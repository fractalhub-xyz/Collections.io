import React, { useState, useEffect } from "react";
import styles from "./navbar.module.css";
import { faAlignJustify, faBrain } from "@fortawesome/free-solid-svg-icons";
import { getLogout, getIsLoggedIn } from "../helpers/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Navbar() {
  const [isLogged, setisLogged] = useState(false);

  const handleLogout = async () => {
    try {
      await getLogout();
      setisLogged(false);
      localStorage.removeItem("username");
    } catch {
      alert("Oops failed");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("username") !== null) {
      console.log("LoggedIn");
      setisLogged(true);
    } else {
      console.log("LoggedOut");
      setisLogged(false);
    }
  }, []);

  return (
    <div className={styles.nav}>
      <div>
        <a className={styles.icon} href="/collections">
          <FontAwesomeIcon icon={faBrain} />
          <span className={styles.label}>COLLECTIONS.IO</span>
        </a>
      </div>
      <div className={styles.usercontrol}>
        {isLogged ? (
          <div>
            {localStorage["username"]} &nbsp;|
            <span>
              {isLogged && (
                <button class={styles.btn} onClick={handleLogout}>
                  LOGOUT
                </button>
              )}
            </span>
          </div>
        ) : (
          <div className={styles.login}>
            <a href="/">LOGIN</a>
          </div>
        )}
      </div>
      {/* <div>{isLogged && <button onClick={handleLogout}>Logout</button>}</div> */}
    </div>
  );
}

export default Navbar;
