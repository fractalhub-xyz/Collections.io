import React, { useState } from "react";
import { useStateValue } from "../../helpers/stateProvider";
//modules
import { useForm } from "react-hook-form";
//api
import { postNewSnippet } from "../../helpers/api";
import { Description, Link, Mic, Movie } from "@material-ui/icons";
import SubmitButton from './submitBtn'

function CreateSnippet() {
  const { register, handleSubmit, errors, formState } = useForm();
  const [{ id }, dispatch] = useStateValue();
  const [type, setType] = useState("podcast");
  const [error, setError] = useState("");

  const createSnippet = async (data, e) => {
    e.preventDefault();
    const payload = {
      title: data.title,
      type_of: type,
      link: data.link,
      collection: id,
    };
    try {
      await postNewSnippet(payload);
      console.log("Successfully pushed snippet to collection");
      dispatch({ type: "CLOSE_MODAL" });
      dispatch({
        type: "REFRESH",
        refresh: true,
      });
    } catch (error) {
      console.log("Failed to create a new collection");
      setError(error.response.data.detail);
    }
  };

  return (
    <form onSubmit={handleSubmit(createSnippet)} className="create-snippet">
      <header />
      <section>
        <h1>Add new snippet</h1>
        <label>Title</label>
        <input
          name="title"
          ref={register({
            required: {
              value: true,
              message: "Snippets require a title",
            },
          })}
        />
        {errors?.title?.message && (
          <p className="error-message">{errors.title.message}</p>
        )}
        <label>Link</label>
        <textarea
          name="link"
          ref={register({
            required: {
              value: true,
              message: "Snippets require a link",
            },
            // maxLength: { value: 100, message: "isa too big" },
          })}
        />
        {errors?.link?.message && (
          <p className="error-message">{errors.link.message}</p>
        )}
        <label>Type</label>
        <div className="selects">
          <div
            className={
              type === "podcast" ? "select center current" : "select center"
            }
            onClick={() => {
              setType("podcast");
            }}
          >
            <Mic />
          </div>
          <div
            className={
              type === "article" ? "select center current" : "select center"
            }
            onClick={() => {
              setType("article");
            }}
          >
            <Description />
          </div>
          <div
            className={
              type === "link" ? "select center current" : "select center"
            }
            onClick={() => {
              setType("link");
            }}
          >
            <Link />
          </div>
          <div
            className={
              type === "video" ? "select center current" : "select center"
            }
            onClick={() => {
              setType("video");
            }}
          >
            <Movie />
          </div>
        </div>
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
          Create
        </SubmitButton>
      </section>
      <footer />
    </form>
  );
}

export default CreateSnippet;
