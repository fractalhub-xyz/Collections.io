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
    if (localStorage.getItem('username') !== null) {
      console.log('LoggedIn')
      setisLogged(true);
    } else {
      console.log('LoggedOut')
      setisLogged(false);
    }
  }, []);

  return (
    <div className={styles.nav}>
      <div>
        <a>
          <FontAwesomeIcon
            icon={faBrain}
            size="lx"
            style={{ color: "white" }}
          />
        </a>
      </div>
      <a href="/">
        <FontAwesomeIcon
          icon={faAlignJustify}
          size="lx"
          style={{ color: "white" }}
        />
        <span className={styles.label}>COLLECTIONS.IO</span>
      </a>
      <div>
        {isLogged ? (
          <div>
            {localStorage["username"]}|
            <span>
              {isLogged && <button onClick={handleLogout}>Logout</button>}
            </span>
          </div>
        ) : (
          <div>
            <a href="/">Login</a>
          </div>
        )}
      </div>
      {/* <div>{isLogged && <button onClick={handleLogout}>Logout</button>}</div> */}
    </div>
  );
}

export default Navbar;
