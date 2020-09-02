import React, { useEffect } from "react";
import "./login.sass";
//components
import LoginForm from "./loginForm";
import { useStateValue } from "../../helpers/stateProvider";
// import cx from "../../helpers/cx";

function Login() {
  const [, dispatch] = useStateValue();

  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch({ type: "SET_USER", user: null });
  }, [dispatch]);

  return (
    <main className="login">
      <header>
        <div className="Logo-container">
          <div className="blue streak" />
          <div className="red streak" />
          <div className="beige streak" />
          <div className="LOGO">COLLECTIONS</div>
        </div>
      </header>
      <section>
        <LoginForm dispatch = {dispatch}/>
      </section>
    </main>
  );
}

export default Login;
