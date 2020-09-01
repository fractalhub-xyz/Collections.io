import React from "react";
import { useForm } from "react-hook-form";
//api
import { postLogin } from "../../helpers/api";

function LoginForm() {
  const { register, handleSubmit, errors } = useForm();

  // const onSubmit = (data) => {
  //   console.log(data);
  // };

  const loginReq = async (data) => {
    const payload = {
      username: data.username,
      password: data.password,
    };
    try {
      const response = await postLogin(payload);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", data.username);
    } catch {
      alert("failed // temp");
    }
  };

  return (
    <form onSubmit={handleSubmit(loginReq)}>
      <h1>Login</h1>
      <label>Username</label>
      <input name="username" ref={register({ required: true })} />
      {errors.username && errors.username.type === "required" && (
        <p>This Field is required</p>
      )}
      <label>Password</label>
      <input
        name="password"
        ref={register({
          required: {
            message: "This is a error message (required field)",
            value: true,
          },
          maxLength: { value: 200, message: "isa too big" },
        })}
      />
      <p>{errors?.password?.message}</p>
      <button type="submit">Submit</button>
    </form>
  );
}

export default LoginForm;
