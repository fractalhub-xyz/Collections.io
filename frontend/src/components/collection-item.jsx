import React, { useState } from "react";
import styles from "./collection-item.module.css";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SnippetItem from "./snippet-item";

function CollectionItem({ name, owner, desc, snippets }) {
  const [show, setShow] = useState(false);
  return (
    <div className={styles.holder}>
      <div className={styles.card}>
        {" "}
        <div id={styles.name}>{name}</div>
        <div id={styles.owner}>by {owner}</div>
        <div id={styles.desc}>{desc}</div>
        <div>
          {!show && (
            <div>
              <button
                class={styles.btn}
                onClick={() => {
                  setShow(!show);
                }}
              >
                <FontAwesomeIcon
                  icon={faAngleDown}
                  size="xl"
                  style={{ color: "white" }}
                />
              </button>
              <div className={styles.info}>
                Click to show snippets in this collection
              </div>
            </div>
          )}
          {show && (
            <div>
              <table id={styles.snippets}>
                {!!snippets.length ? (
                  <tr>
                    <th>Title</th>
                    <th>Link</th>
                    <th>Link</th>
                  </tr>
                ) : null}
                {snippets.map((snippet) => (
                  <SnippetItem
                    key={snippet.id}
                    title={snippet.title}
                    link={snippet.link}
                  />
                ))}
              </table>
              {!snippets.length && (
                <h5 className={styles.info}>No entries in this collection</h5>
              )}
              <div>
                <button
                  class={styles.btn}
                  onClick={() => {
                    setShow(!show);
                  }}
                >
                  <FontAwesomeIcon
                    icon={faAngleUp}
                    size="xl"
                    style={{ color: "white" }}
                  />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CollectionItem;
