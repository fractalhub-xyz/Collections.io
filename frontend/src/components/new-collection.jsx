import React, { useState } from "react";
import styles from "./new-collection.module.css";
import { postNewCollection } from "../helpers/api";

function NewCollection() {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  const submitForm = async (e) => {
    e.preventDefault();
    const data = { name, desc };
    try {
      const response = await postNewCollection(data);
      if (response.success) {
        console.log("success")
      } else {
        console.log("Something went wrong")
      }
    }
    catch (e) {
      console.log(e)
    }
  };

  return (
    <div className={styles.body}>
      <div className={styles.logindiv}>
        <div className={styles.logo}></div>
        <div className={styles.title}>New collection</div>
        <div className={styles.subtitle}>
          by {localStorage.getItem("username")}
        </div>
        <div className={styles.fields}>
          <div className={styles.name}>
            <input
              className={styles.input}
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className={styles.desc}>
            <input
              className={styles.input}
              type="text"
              placeholder="Description"
              value={desc}
              onChange={(e) => {
                setDesc(e.target.value);
              }}
            />
          </div>
          <button className={styles.submitbutton} onClick={submitForm}>
            {" "}
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewCollection;
