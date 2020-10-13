import React, { useEffect, useState } from "react";
import "./login.sass";
//components
import LoginForm from "./loginForm";
import RegisterForm from "./registerForm";
function Login() {
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }, []);

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
