import React, { useState } from "react";
//api
import { postTagsToCollection } from "../../helpers/api";
//modules
import { useForm } from "react-hook-form";
import { useStateValue } from "../../helpers/stateProvider";

function EditTags() {
  const [{ prefill_data, id }, dispatch] = useStateValue();
  const [error, setError] = useState("");
  const prevTags = prefill_data.tags;

  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      tags: prevTags,
    },
  });

  const addTagHandler = async (data, e) => {
    e.preventDefault();
    const tags = data.tags
      .split(",")
      .map((t) => t.trim())
      .join(",");
    const payload = {
      tags,
    };

    try {
      await postTagsToCollection(id, payload);
      dispatch({ type: "CLOSE_MODAL" });
      dispatch({
        type: "REFRESH",
        refresh: true,
      });
      console.log("Succesfull edited Collection");
    } catch (error) {
      console.log(error);
      setError("Failed to Add Tag");
    }
  };

  return (
    <form onSubmit={handleSubmit(addTagHandler)} className="add-tags">
      <header />
      <section>
        <h1>Edit Tags</h1>
        <label>Tags</label>
        <input name="tags" ref={register()} />
        <div className="buttons">
          <button className="edit-button" type="submit">
            Save
          </button>
        </div>
      </section>
      <footer />
    </form>
  );
}

export default EditTags;
