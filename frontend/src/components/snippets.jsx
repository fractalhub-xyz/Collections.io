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
import { editSnippet, deleteSnippet } from "../helpers/api";

function Snippets({ snip, collectionID }) {
  //states
  const [isOwner, setIsOwner] = useState(false);
  // input states
  const [snippet, setSnippet] = useState(snip);
  const [title, setTitle] = useState(snippet.title);
  const [link, setLink] = useState(snippet.link);
  const [typeOf, setTypeOf] = useState(snippet.type_of);

  //lifecycle funcs
  useEffect(() => {
    if (localStorage.getItem("user") === snippet.owner) {
      setIsOwner(true);
    } else {
      setIsOwner(false);
    }
  }, []);

  //functions
  const editSnip = async (e) => {
    e.preventDefault();
    try {
      const data = {
        title: title,
        link: link,
        type_of: typeOf,
        collection: collectionID,
      };
      const response = await editSnippet(snip.id, data);
      setSnippet(response.data);
    } catch {
      setTitle(snip.title);
      setLink(snip.link);
      setTypeOf(snip.type_of);
      alert("Error happened");
    }
  };
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
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></input>
          </span>
          <span className={styles.inputcontainer}>
            <input
              value={link}
              onChange={(e) => setLink(e.target.value)}
            ></input>
          </span>
          <span className={styles.inputcontainer}>
            <input
              value={typeOf}
              onChange={(e) => setTypeOf(e.target.value)}
            ></input>
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
          <a onClick={editSnip}>
            <FontAwesomeIcon icon={faEdit} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Snippets;
