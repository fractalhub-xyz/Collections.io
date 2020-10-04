import React, { useEffect, useState } from "react";
import "./login.sass";
//components
import LoginForm from "./loginForm";
import RegisterForm from "./registerForm";
import { useStateValue } from "../../helpers/stateProvider";
import Toggle from "react-toggle";
// import cx from "../../helpers/cx";

function Login() {
  const [, dispatch] = useStateValue();
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }, []);

  return (
    <main className="login">
      <header className="center">
        COLLECTIONS
      </header>
      <section className="center">

        {isLogin ? (
          <LoginForm setIsLogin={setIsLogin} />
        ) : (
          <RegisterForm setIsLogin={setIsLogin} />
        )}
      </section>
    </main>
  );
}

export default Login;
