import React, { useState } from "react";
import { useForm } from "react-hook-form";
//modules
import { useHistory } from "react-router-dom";
//api
import { postLogin } from "../../helpers/api";

function LoginForm({ setIsLogin }) {
  const { register, handleSubmit, errors, formState } = useForm();
  const [error, setError] = useState("");
  //setup
  let history = useHistory();

  const redirect = () => {
    history.push("/home");
  };

  const loginReq = async (data) => {
    const payload = {
      username: data.username,
      password: data.password,
    };
    try {
      const response = await postLogin(payload);
      console.log(response.data.token);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", data.username);
      setTimeout(redirect, 200);
    } catch {
      setError("Invalid Credentials");
    }
  };

  return (
    <form onSubmit={handleSubmit(loginReq)}>
      <h1>Login</h1>
      <h2>To access collections! </h2>
      <label>Username</label>
      <input
        name="username"
        ref={register({
          required: {
            message: "Please enter a username",
            value: true,
          },
        })}
      />
      <p>{errors?.username?.message}</p>
      <label>Password</label>
      <input
        name="password"
        type="password"
        ref={register({
          required: {
            message: "Please enter a password",
            value: true,
          },
        })}
      />
      <p>{errors?.password?.message}</p>
      {!!error.length && <div className="err">{error}</div>}
      <div
        className="toggle"
        onClick={() => {
          setIsLogin(false);
        }}
      >
        {" "}
        New here? Click here to register!{" "}
      </div>
      <button
        disabled={formState.isSubmitting}
        type="submit">
            {formState.isSubmitting ? "Loading..." : "Log In" }
        </button>
    </form>
  );
}

export default LoginForm;
