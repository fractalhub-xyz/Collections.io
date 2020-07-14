import React, { useState } from "react";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

import { postNewSnippet } from "../../helpers/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "../collections.module.css";

function NewSnippet({ addSnippetToCollection, collection }) {
  //createSnippet
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [type, setType] = useState("podcast");

  const createSnippet = async (e) => {
    e.preventDefault();
    const payload = {
      title: title,
      type_of: type,
      link: link,
      collection: collection.id,
    };
    try {
      const { data } = await postNewSnippet(payload);
      addSnippetToCollection(data);
      console.log("Successfully pushed snippet to collection");
    } catch {
      console.log("Failed to create a new collection");
      alert("Failed");
    }

    setTitle("");
    setLink("");
    setType("podcast");
  };

  return (
    <div>
      <h1>
        Add a new snippet to Collection {collection.name} by{" "}
        {localStorage.getItem("user")}
      </h1>
      <div className={styles.addSnippetFormContainer}>
        <div>
          <input
            className={styles.input}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="TITLE"
          ></input>
        </div>
        <div>
          <input
            className={styles.input}
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            required
            placeholder="LINK"
          ></input>
        </div>
        <div>
          <input
            className={styles.input}
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
            placeholder="TYPE"
          ></input>
        </div>
        <div className={styles.addSnippetToCollectionIcon}>
          <FontAwesomeIcon
            icon={faPaperPlane}
            className={styles.addCollectionIcon}
            onClick={createSnippet}
          />
        </div>
      </div>
    </div>
  );
}

export default NewSnippet;
