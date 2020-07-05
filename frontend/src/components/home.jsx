import React from "react";
import { getLogout } from "../helpers/api";
import { useHistory, Link } from "react-router-dom";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./home.module.css";

export default function Home() {
  const history = useHistory();

  const handleLogout = async () => {
    try {
      await getLogout();
      history.push("/login");
    } catch {
      alert("Oops error happened");
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.super}>
        <div>Welcome to Collections</div>
        <div>
          <a href="/collections">
            <FontAwesomeIcon
              icon={faAngleRight}
              size="xl"
              style={{ color: "white" }}
            />
          </a>
        </div>
      </div>
    </div>
  );
}

{
  /* <div>
  <button onClick={handleLogout}>Logout</button>
  You're successfully logged in.
  <p>
    <Link to="/collections">Go to collections</Link>
  </p>
</div>; */
}
