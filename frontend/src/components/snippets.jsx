import React, { useState, useEffect } from "react";
//modules
import styles from "./snippets.module.css";
import {
  faLink,
  faUserSlash,
  faUserCog,
  faUndo,
  faTrashAlt,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//components
import { deleteSnippet } from "../helpers/api";

function Snippets(snippet) {
  snippet = snippet.snippet;
  //states
  const [isOwner, setIsOwner] = useState(false);
  //lifecycle funcs
  useEffect(() => {
    if (localStorage.getItem("user") === snippet.owner) {
      setIsOwner(true);
    } else {
      setIsOwner(false);
    }
  }, []);

  //functions
  const deletesnip = async (e) => {
    e.preventDefault();
    try {
      deleteSnippet(snippet.id);
      console.log(`Deleted Snippet ${snippet.title}`);
    } catch {
      console.log("Failed to delete snippet");
      alert("Failed to delete :(");
    }
  };

  const [showEdit, setShowEdit] = useState(true);
  const hideRow = !showEdit && styles.hide;
  const hideEdit = showEdit && styles.hide;

  return (
    <div className={styles.main}>
      <div className={`${styles.row} ${hideRow}`}>
        <div className={styles.col}>{snippet.title}</div>

        <div className={`${styles.col} ${styles.md}`}>{snippet.owner}</div>
        <div className={`${styles.col} ${styles.md}`}>{snippet.type_of}</div>
        <div className={`${styles.col} ${styles.sm}`}>
          <a href="">
            <FontAwesomeIcon icon={faLink} className={styles.snipIcon} />
          </a>
        </div>

        {isOwner ? (
          <div className={`${styles.col} ${styles.sm}`}>
            <a
              onClick={() => {
                setShowEdit(false);
              }}
            >
              <FontAwesomeIcon icon={faUserCog} className={styles.snipIcon} />
            </a>
          </div>
        ) : (
          <div className={`${styles.col} ${styles.sm}`}>
            <FontAwesomeIcon icon={faUserSlash} className={styles.snipIcon} />
          </div>
        )}
      </div>
      <div className={`${styles.row} ${hideEdit}`}>
        <div className={styles.editRow}>
          <span className={styles.inputcontainer}>
            <input placeholder={snippet.title}></input>
          </span>
          <span className={styles.inputcontainer}>
            <input placeholder={snippet.link}></input>
          </span>
          <span className={styles.inputcontainer}>
            <input placeholder={snippet.type_of}></input>
          </span>
          <a
            onClick={() => {
              setShowEdit(true);
            }}
          >
            <FontAwesomeIcon icon={faUndo} />
          </a>
          <a onClick={deletesnip}>
            <FontAwesomeIcon icon={faTrashAlt} />
          </a>
          <a onClick={deletesnip}>
            <FontAwesomeIcon icon={faEdit} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Snippets;
