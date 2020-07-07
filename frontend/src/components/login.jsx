import React, { useState, useContext } from "react";
//CSS
import styles from "./login.module.css";
//components
import { useHistory } from "react-router-dom";
import { postLogin } from "../helpers/api";
import { Log } from "./home"
//modules
import {
  faAngleRight,
  faUserCircle,
  faKey,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Login() {
  //states
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  //context
  const [loggedin, setLoggedin] = useContext(Log)

  //funcs
  const handleOnClick = async (e) => {
    e.preventDefault();
    const data = { username, password };
    try {
      const response = await postLogin(data);
      localStorage.setItem("token", response.data.token)
      localStorage.setItem("user", username)
      console.log("logging in")
      setLoggedin(true)
    } catch {
      console.log('bad request')
      setError("Credentials are not valid");
      setLoggedin(false)
    }
  };

  return (
    <div>
      {loggedin && <h2>HOI</h2>}
      <form className={styles.formContainer}>
        <div className={styles.inputbox}>
          <FontAwesomeIcon icon={faUserCircle} className={styles.inputIcon} />
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
          <FontAwesomeIcon icon={faKey} className={styles.inputIcon} />
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
        <button className={styles.btn} onClick={handleOnClick} type="submit">
          <FontAwesomeIcon icon={faAngleRight} style={{ color: "white" }} />
        </button>
        <div className={styles.info}>
          <a href="/register">New Here? Click here to register</a>
        </div>
        <div className={styles.info}>
          <a href="/collections">Click here to continue without logging in</a>
        </div>
      </form>
    </div>
  );
}

export default Login;
