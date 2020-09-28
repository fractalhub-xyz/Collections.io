import React, { useEffect, useState } from "react";
import "./login.sass";
//components
import LoginForm from "./loginForm";
import RegisterForm from "./registerForm";
import { useStateValue } from "../../helpers/stateProvider";
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
      <header>
        <div className="Logo-container">
          <div className="blue streak" />
          <div className="red streak" />
          <div className="beige streak" />
          <div className="LOGO">COLLECTIONS</div>
        </div>
      </header>
      <section>
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
