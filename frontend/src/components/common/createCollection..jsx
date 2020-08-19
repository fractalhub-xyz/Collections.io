import React from "react";
//modules
import { useForm } from "react-hook-form";

function CreateCollection() {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="edit-collection">
      <h1>Create New Collection</h1>
      <section>
        <label>Name of Collection</label>
        <input
          name="name"
          ref={register({
            required: {
              value: true,
              message: "The new collection needs a name",
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
              message:
                "You need to provide a short description for your collection",
              value: true,
            },
            maxLength: { value: 100, message: "isa too big" },
          })}
        />
        {errors?.desc?.message && (
          <p className="error-message">{errors.desc.message}</p>
        )}
        <button type="submit">Submit</button>
      </section>
    </form>
  );
}

export default CreateCollection;
