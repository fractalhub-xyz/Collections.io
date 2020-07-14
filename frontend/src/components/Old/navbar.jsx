import React, { useContext } from "react";

//CSS
import styles from "./navbar.module.css";
//modules
import { faBrain } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//compoonents

//context
import { Log } from "./home";

function Navbar() {
  //context
  const [loggedin, setLoggedin] = useContext(Log);
  
  //functions
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setLoggedin(false);
    console.log("Logging out!");
  };
  return (
    <div className={styles.main}>
      <a className={styles.icon} href="/">
        <FontAwesomeIcon icon={faBrain} />
        <span className={styles.label}>&nbsp;COLLECTIONS.IO</span>
      </a>
      <div>
        {!loggedin ? (
          <a>
            <div className={styles.btn}>LOGIN</div>
          </a>
        ) : (
          <a>
            <div className={styles.btn} onClick={handleLogout}>
              LOGOUT
            </div>
          </a>
        )}
      </div>
    </div>
  );
}

export default Navbar;
