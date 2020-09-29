import React, { useState } from "react";
//api
import { editCollection } from "../../helpers/api";
//modules
import { useForm } from "react-hook-form";
import { useStateValue } from "../../helpers/stateProvider";
import { Public, Lock } from "@material-ui/icons";

function EditCollection() {
  const [{ prefill_data, id }, dispatch] = useStateValue();
  const form_data = prefill_data.form_data;
  const { register, handleSubmit, errors } = useForm({
    defaultValues: form_data,
  });
  const [visibility, setVisiblity] = useState(prefill_data.visibility);
  const [error, setError] = useState("");


  const editCollectionHandle = async (data, e) => {
    e.preventDefault();
    const payload = {
      name: data.name,
      desc: data.desc,
      visibility: visibility,
    };
    try {
      await editCollection(id, payload);
      console.log("Successfully updated collection");
      dispatch({ type: "CLOSE_MODAL" });
      dispatch({
        type: "REFRESH",
        refresh: true,
      });
    } catch (error) {
      console.log("Failed to updated a collection");
      setError(error.response.data.detail);
    }
  };

  return (
    <form onSubmit={handleSubmit(editCollectionHandle)} className="edit-collection">
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
        <label>visibility</label>
        <div className="selects">
          <div
            className={
              visibility === "public"
                ? "select center current"
                : "select center"
            }
            onClick={() => {
              setVisiblity("public");
            }}
          >
            <Public />
            &nbsp; PUBLIC
          </div>
          <div
            className={
              visibility === "private"
                ? "select center current"
                : "select center"
            }
            onClick={() => {
              setVisiblity("private");
            }}
          >
            <Lock />
            &nbsp; PRIVATE
          </div>
        </div>
        <button type="submit">Submit</button>
      </section>
      <footer />
    </form>
  );
}

export default EditCollection;
