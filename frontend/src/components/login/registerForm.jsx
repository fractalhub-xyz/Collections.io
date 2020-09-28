import React from "react";
import { useForm } from "react-hook-form";
//modules
//api
import { postRegister } from "../../helpers/api";

function RegisterForm({ setIsLogin }) {
  const { register, handleSubmit, errors } = useForm();

  const registerReq = async (data) => {
    const payload = {
      username: data.username,
      email: data.email,
      password: data.password,
    };
    try {
      await postRegister(payload);
      setIsLogin(true);
    } catch {
      alert("failed // temp");
    }
  };
  //

  return (
    <form onSubmit={handleSubmit(registerReq)}>
      <h1>Hi!</h1>
      <h2>Register to access collections! </h2>
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
      <label>Email</label>
      <input
        name="email"
        ref={register({
          required: {
            message: "Please enter a email",
            value: true,
          },
        })}
      />
      <p>{errors?.email?.message}</p>
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
      <div
        className="toggle"
        onClick={() => {
          setIsLogin(true);
        }}
      >
        {" "}
        Already have an account? Click here to login!{" "}
      </div>
      <button type="submit">Register</button>
    </form>
  );
}

export default RegisterForm;
