import React from "react";
import styles from "./snippets.module.css";

function Snippets(snippet) {
  // console.log(snippet.snippet)
  snippet = snippet.snippet;
  return (
    <div className={styles.snippetContainer}>
      <h1>{snippet.title}</h1>
      <h1>{snippet.owner}</h1>
      <h1>{snippet.link}</h1>
    </div>
  );
}

export default Snippets;
