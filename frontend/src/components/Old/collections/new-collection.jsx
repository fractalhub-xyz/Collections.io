import React, { useState } from "react";
import styles from "../collections.module.css";
import { postNewCollection } from "../../helpers/api";

function NewCollection({ addCollectionToExisting }) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  const createCollection = async (e) => {
    e.preventDefault();
    const payload = { name, desc };
    try {
      const { data } = await postNewCollection(payload);
      addCollectionToExisting(data);
    } catch {
      console.log("Failed to create a new collection");
      // add error message
      alert("Failed");
    }
  };

  return (
    <div>
      <div className={styles.center}>
        <div className={styles.sides} />
        <div className={`${styles.focus} ${styles.center}`}>
          <h4>Create New collection!</h4>
          <input
            className={styles.singleLineInput}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Collection name"
          />
          <input
            className={styles.multiLineInput}
            type="text"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            required
            placeholder="Collection description"
          />
          <button className={styles.submitbutton} onClick={createCollection}>
            Create
          </button>
        </div>
        <div className={styles.sides} />
      </div>
    </div>
  );
}

export default NewCollection;
