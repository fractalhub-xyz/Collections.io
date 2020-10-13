import React, { useState } from "react";
//api
import { updateUser } from "../../helpers/api";
//modules
import { useForm } from "react-hook-form";
import { useStateValue } from "../../helpers/stateProvider";
import { useHistory } from "react-router-dom";
import SubmitButton from "./submitBtn";

function UpdateUser() {
  const { register, handleSubmit, errors, formState } = useForm();
  const [, dispatch] = useStateValue();
  let history = useHistory();
  const [error, setError] = useState("");
  const updateUserCreds = async (data, e) => {
    e.preventDefault();
    if (data.new_pass === data.new_pass_2) {
      const payload = {
        username: localStorage.getItem("user"),
        old_pass: data.old_pass,
        new_pass: data.new_pass,
      };
      try {
        const response = await updateUser(payload);
        console.log("Successfully created new collection");
        dispatch({ type: "CLOSE_MODAL" });
      } catch (error) {
        console.log(error.response);
        setError(error.response.data.status);
      }
    } else {
      setError('Passwords do not match')
    }
  };

  console.log("Form state", formState);

  return (
    <form
      onSubmit={handleSubmit(updateUserCreds)}
      className="create-collection"
    >
      <header />
      <section>
        <h1>Edit Profile Settings</h1>
        <label>Enter your old password</label>
        <input
          name="old_pass"
          type="password"
          ref={register({
            required: {
              value: true,
              message: "Please enter your old password",
            },
          })}
        />
        {errors?.old_pass?.message && (
          <p className="error-message">{errors.old_pass.message}</p>
        )}
        <label>Enter a new password</label>
        <input
          name="new_pass"
          type="password"
          ref={register({
            required: {
              value: true,
              message: "Please enter a new password",
            },
          })}
        />
        {errors?.new_pass?.message && (
          <p className="error-message">{errors.new_pass.message}</p>
        )}

        <label>Enter the password again</label>
        <input
          name="new_pass_2"
          type="password"
          ref={register({
            required: {
              value: true,
              message: "Please enter the new password again",
            },
          })}
        />
        {errors?.new_pass_2?.message && (
          <p className="error-message">{errors.new_pass_2.message}</p>
        )}

        {!!error.length && (
          <div className="api-error">
            {error}
            <span
              className="back"
              onClick={() => {
                dispatch({ type: "CLOSE_MODAL" });
              }}
            >
              &nbsp;[ go back ]
            </span>
          </div>
        )}
        <SubmitButton isSubmitting={formState.isSubmitting}>
          Submit
        </SubmitButton>
      </section>
      <footer />
    </form>
  );
}

export default UpdateUser;
