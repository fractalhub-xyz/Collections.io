import React from "react";
import "./login.sass";
//components
import LoginForm from "./loginForm";

// import cx from "../../helpers/cx";

function Login() {
  return (
    <main className="login">
      <header>This should be aqua yellow</header>
      <section>
        <LoginForm />
      </section>
    </main>
  );
}

export default Login;
