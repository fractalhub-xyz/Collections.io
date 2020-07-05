import React from "react";
import styles from "./collection-item.module.css";

function CollectionItem({ name, owner, desc }) {
  return (
    <div className={styles.card}>
      <div id={styles.name}>{name}</div>
      <div id={styles.owner}>{owner}</div>
      <div id={styles.desc}>{desc}</div>
    
    </div>
  );
}

export default CollectionItem;

{
  /* Snippets:
  {snippets.map((snippet) => (
        <div key={snippet.id}>
          Title: {snippet.title} | Link: {snippet.link}
        </div>
      ))} */
}
