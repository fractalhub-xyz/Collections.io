import React, { useState, useEffect } from "react";
//modules
import styles from "./snippets.module.css";
import { faLink, faUserSlash, faUserCog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
  return (
    <div className={styles.row}>
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
          <a href="">
            <FontAwesomeIcon icon={faUserCog} className={styles.snipIcon} />
          </a>
        </div>
      ) : (
        <div className={`${styles.col} ${styles.sm}`}>
          <FontAwesomeIcon icon={faUserSlash} className={styles.snipIcon} />
        </div>
      )}
    </div>
  );
}

export default Snippets;
