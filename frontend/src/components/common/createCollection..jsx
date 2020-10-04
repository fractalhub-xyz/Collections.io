import React, { useState } from "react";
//api
import { postNewCollection } from "../../helpers/api";
//modules
import { useForm } from "react-hook-form";
import { useStateValue } from "../../helpers/stateProvider";
import { useHistory } from "react-router-dom";

function CreateCollection() {
  const { register, handleSubmit, errors } = useForm();
  const [, dispatch] = useStateValue();
  let history = useHistory();
  const [error, setError] = useState("");
  const createCollection = async (data, e) => {
    e.preventDefault();
    const payload = {
      name: data.name,
      desc: data.desc,
    };
    try {
      const response = await postNewCollection(payload);
      console.log("Successfully created new collection");
      dispatch({ type: "CLOSE_MODAL" });
      history.push(`/collection/${response.data.id}`);
    } catch (error) {
      console.log("Failed to create a new collection");
      setError(error.response.data.detail);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(createCollection)}
      className="create-collection"
    >
      <header />
      <section>
        <h1>Create new collection</h1>
        <label>Name</label>
        <input
          name="name"
          ref={register({
            required: {
              value: true,
              message: "Snippets require a name",
            },
          })}
        />
        {errors?.name?.message && (
          <p className="error-message">{errors.name.message}</p>
        )}
        <label>Description</label>
        <textarea
          name="desc"
          ref={register({
            required: {
              value: true,
              message: "Snippets require a sescription",
            },
            // maxLength: { value: 100, message: "isa too big" },
          })}
        />
        {errors?.desc?.message && (
          <p className="error-message">{errors.desc.message}</p>
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
        <button type="submit">Submit</button>
      </section>
      <footer />
    </form>
  );
}

export default CreateCollection;
