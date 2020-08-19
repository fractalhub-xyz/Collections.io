import React from "react";
import "./login.sass";
//components
import LoginForm from "./loginForm";
import { useStateValue } from "../../helpers/stateProvider";
// import cx from "../../helpers/cx";

function Login() {
  const [{ user }, dispatch] = useStateValue();

  return (
    <main className="login">
      <header>This should be aqua yellow</header>
      <section>
        <LoginForm />
        <p>{user}</p>
        <button
          onClick={() => {
            dispatch({ type: "SET_USER", user: "admin" });
          }}
        >
          set
        </button>
        <button
          onClick={() => {
            dispatch({ type: "SET_USER", user: "not admin" });
          }}
        >
          reset
        </button>
        <button
          onClick={() => {
            dispatch({ type: "TOGGLE_MODAL", modal: true });
          }}
        >
          OPEN MODAL
        </button>
      </section>
    </main>
  );
}

export default Login;
