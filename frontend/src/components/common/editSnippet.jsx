import React, { useState } from "react";
import { useStateValue } from "../../helpers/stateProvider";
//modules
import { useForm } from "react-hook-form";
//api
import { deleteSnippet, editSnippet } from "../../helpers/api";
import { Delete, Description, Link, Mic, Movie } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import SubmitButton from './submitBtn'

function EditSnippet() {
  const [{ id, prefill_data }, dispatch] = useStateValue();
  const [isDeleting, setIsDeleting] = useState(false)
  const form_data = prefill_data.form_data;
  const { register, handleSubmit, errors, formState } = useForm({
    defaultValues: form_data,
  });
  const [type, setType] = useState(prefill_data.type);
  const [error, setError] = useState("");

  let history = useHistory();

  const createSnippet = async (data, e) => {
    e.preventDefault();
    const payload = {
      title: data.title,
      type_of: type,
      link: data.link,
      collection: id.coll_id,
    };
    try {
      await editSnippet(id.snip_id, payload);
      console.log("Successfully editted snippet");
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

  const deleteSelected = async (e) => {
    e.preventDefault();
    try {
      setIsDeleting(true)
      await deleteSnippet(id.snip_id);
      dispatch({ type: "CLOSE_MODAL" });
      console.log("Successfully removed snippet from collection");
      history.push(`/collection/${id.coll_id}`);
    } catch (error) {
      setIsDeleting(false)
      console.log(error.response.data);
      setError(error.response.data);
    }
  };

  return (
    <form onSubmit={handleSubmit(createSnippet)} className="edit-snippet">
      <header />
      <section>
        <h1>Edit snippet</h1>
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
        { formState?.title?.message && (
          <p className="error-message">{ formState.title.message}</p>
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
        <div className="buttons">
          <SubmitButton isSubmitting={formState.isSubmitting || isDeleting} classes="edit-button">
            Save
          </SubmitButton>
          <button
            onClick={deleteSelected}
            className="delete-button"
            type="submit"
            disabled={isDeleting}
          >
            <Delete fontSize="small"/>
          </button>
        </div>
      </section>
      <footer />
    </form>
  );
}

export default EditSnippet;
