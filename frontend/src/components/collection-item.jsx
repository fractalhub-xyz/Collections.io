import React, { useState } from "react";
import styles from "./collection-item.module.css";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function CollectionItem({ name, owner, desc, snippets }) {
  const [show, setShow] = useState(false);
  return (
    <div className={styles.holder}>
      <div className={styles.card}>
        <div id={styles.name}>{name}</div>
        <div id={styles.owner}>{owner}</div>
        <div id={styles.desc}>{desc}</div>
        {!show && (
          <div id={styles.ico}>
            <button
              onClick={() => {
                setShow(!show);
              }}
            >
              click
            </button>
            <FontAwesomeIcon
              icon={faAngleDown}
              size="xl"
              style={{ color: "white" }}
            />
          </div>
        )}
        {show && (
          <div id={styles.ico}>
            
            <button
              onClick={() => {
                setShow(!show);
              }}
            >
              click
            </button>
            <FontAwesomeIcon
              icon={faAngleUp}
              size="xl"
              style={{ color: "white" }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default CollectionItem;
