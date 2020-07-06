import React, { useState, useEffect } from "react";
import styles from "./collection-item.module.css";
import { faAngleDown, faAngleUp, faCog } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SnippetItem from "./snippet-item";

function CollectionItem({ name, owner, desc, snippets }) {
  const [show, setShow] = useState(false);
  const [isOwner, setIsOwner] = useState(false)
  useEffect(() => {
    if (owner == localStorage["username"]) {
      console.log(name, "is owner");
      setIsOwner(true)
    } else {
      console.log(name, "is not owner");
      setIsOwner(false);
    }
  }, []);

  return (
    <div className={styles.holder}>
      <div className={styles.card}>
        {" "}
        <div id={styles.name}>
          {name}
          {isOwner && (
            <a href="">
              <FontAwesomeIcon
                className={styles.icon}
                icon={faCog}
                size="lx"
                style={{ color: "white" }}
              />
            </a>
          )}
        </div>
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
                  size="lx"
                  style={{ color: "cyan" }}
                />
              </button>
              <div className={styles.info}>
                (Click to show snippets in this collection)
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
                    <th>Type</th>
                    <th>Open as page </th>
                  </tr>
                ) : null}
                {snippets.map((snippet) => (
                  <SnippetItem
                    key={snippet.id}
                    id={snippet.id}
                    title={snippet.title}
                    link={snippet.link}
                    type={snippet.type_of}
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
                    size="lx"
                    style={{ color: "cyan" }}
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
