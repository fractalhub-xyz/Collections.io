import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { postLogin } from "../helpers/api";
import { faAngleRight, faUserCircle, faAdjust } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./home.module.css";

export default function Home() {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleOnClick = async (e) => {
    e.preventDefault();
    const data = { username, password };
    try {
      const response = await postLogin(data);
      if (response.data.success) {
        localStorage.setItem("username", username);
        history.replace("/collections");
      } else {
        setError("Got response but not success");
      }
    } catch {
      setError("Credentials are not valid");
      localStorage.setItem("username", null);
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.super}>
        <div className={styles.title}>Welcome to Collections</div>
        <div className={styles.subtitle}>A simple playlist manager for podcasts and articles</div>
        

        <div className={styles.formContainer}>
          <div className={styles.inputbox}>
            <FontAwesomeIcon
              icon={faUserCircle}
              size="xl"
              style={{ color: "white" }}
            />
            <input
              className={styles.input}
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Username"
            />
          </div>

          <div className={styles.inputbox}>
            <FontAwesomeIcon
              icon={faAdjust}
              size="xl"
              style={{ color: "white" }}
            />
            <input
              className={styles.input}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
            />
          </div>

          {error && <div className={styles.msg}>{error}</div>}
        </div>
        <div className={styles.submit} >
          <button onClick={handleOnClick}>Login</button>
          <a href="/collections">
            <FontAwesomeIcon className={styles.proceed}
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
