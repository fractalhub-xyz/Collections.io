import React, { useState } from "react";
import { useForm } from "react-hook-form";
//modules
//api
import { postRegister } from "../../helpers/api";

function RegisterForm({ setIsLogin }) {
  const { register, handleSubmit, errors, formState } = useForm();

  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const registerReq = async (data) => {
    const payload = {
      username: data.username,
      email: data.email,
      password: data.password,
    };
    try {
      setUsernameError("");
      setEmailError("");
      setPasswordError("");
      await postRegister(payload);
      setIsLogin(true);
    } catch (error) {
      if (error.response.data.username) {
        setUsernameError(error.response.data.username);
      }
      if (error.response.data.email) {
        setEmailError(error.response.data.email);
      }
      if (error.response.data.password) {
        setPasswordError(error.response.data.password);
      }
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
      {!!usernameError.length && <p>{usernameError}</p>}
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
      {!!emailError.length && <p>{emailError}</p>}
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
      {!!passwordError.length && <p>{passwordError}</p>}
      <div
        className="toggle"
        onClick={() => {
          setIsLogin(true);
        }}
      >
        {" "}
        Already have an account? Click here to login!{" "}
      </div>
      <button
        disabled={formState.isSubmitting}
        type="submit">
            {formState.isSubmitting ? "Loading..." : "Register" }
        </button>
    </form>
  );
}

export default RegisterForm;
