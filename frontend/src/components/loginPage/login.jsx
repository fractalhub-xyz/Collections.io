import React, { useState } from "react";
// CSS
import "./login.css";
import { useHistory } from "react-router-dom";
//api
import { postLogin, postRegister } from "../../helpers/api";
//ICONS
import { faChevronCircleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Login() {
  //setup
  let history = useHistory();

  //states
  const [success, setSuccess] = useState(false);
  const [register, setRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [registerstatus, setRegisterstatus] = useState("");

  //functions
  const redirect = () => {
    history.push("/home");
  };

  const loginReq = async (e) => {
    e.preventDefault();
    const data = { username, password };
    try {
      const response = await postLogin(data);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", username);
      localStorage.setItem("userID", 1);
      setSuccess(!success);
      setTimeout(redirect, 1000);
    } catch {
      console.log("bad request");
      setError("Credentials are not valid");
    }
  };

  const registerReq = async (e) => {
    e.preventDefault();
    const data = { username, email, password };
    try {
      if (password === password2) {
        await postRegister(data);
        setRegister(false);
        setUsername("");
        setPassword("");
        setPassword2("");
        setError("");
        setRegisterstatus("Succesfully registered, log in to continue");
      } else {
        setError("Passwords didnt match");
        setPassword("");
        setPassword2("");
      }
    } catch {
      console.log("bad request");
      setError("Credentials are not valid");
    }
  };

  return (
    <div className={success ? "page pageToNav" : "page"}>
      <h1 className={success ? "title hide" : "title"}>
        WELCOME TO <span className="cyan">COLLECTIONS !</span>
      </h1>
      {!register ? (
        <form
          onSubmit={loginReq}
          className={success ? "loginForm hide" : "loginForm"}
        >
          <h5>{registerstatus}</h5>
          <input
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            className="inputfield"
            type="text"
            placeholder="Username"
          />
          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="inputfield"
            type="password"
            placeholder="Password"
          />
          <h5>{error}</h5>
          <button className="formButtom" type="submit">
            LOG IN&nbsp;
            <FontAwesomeIcon icon={faChevronCircleRight} />
          </button>
          <h3
            className="info"
            onClick={() => {
              setRegister(true);
              setUsername("");
              setPassword("");
              setError("");
            }}
          >
            New Here? Click here to register !
          </h3>
        </form>
      ) : (
        <form
          onSubmit={registerReq}
          className={success ? "loginForm hide" : "loginForm"}
        >
          <input
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            className="inputfield"
            type="text"
            placeholder="What should we call you"
          />
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="inputfield"
            type="text"
            placeholder="Where should we contact you"
          />
          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="inputfield"
            type="password"
            placeholder="Security key"
          />
          <input
            value={password2}
            onChange={(e) => {
              setPassword2(e.target.value);
            }}
            className="inputfield"
            type="password"
            placeholder="Re-enter the key"
          />
          <h5>{error}</h5>
          <button className="formButtom" type="submit">
            REGISTER&nbsp;
            <FontAwesomeIcon icon={faChevronCircleRight} />
          </button>
          <h3
            className="info"
            onClick={() => {
              setRegister(false);
            }}
          >
            Already have an account? Click here to login !
          </h3>
        </form>
      )}
    </div>
  );
}

export default Login;
