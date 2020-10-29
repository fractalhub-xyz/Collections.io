import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import "./login.sass";
//components
import LoginForm from "./loginForm";
import RegisterForm from "./registerForm";

function Login() {
  const [isLogin, setIsLogin] = useState(true);

  if (localStorage.getItem('token')) {
    return <Redirect to="/home" />
  }

  return (
    <main className="login">
      <header className="center">
      </header>
      <section className="center">
        <p>COLLECTIONS</p>
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
