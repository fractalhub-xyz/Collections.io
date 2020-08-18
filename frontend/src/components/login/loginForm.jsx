import React from "react";
import { useForm } from "react-hook-form";

function LoginForm() {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
          maxLength: { value: 2, message: "isa too big" },
        })}
      />
      <p>{errors?.password?.message}</p>
      <button type="submit">Submit</button>
    </form>
  );
}

export default LoginForm;
