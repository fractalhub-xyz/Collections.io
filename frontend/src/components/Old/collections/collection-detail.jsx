import React, { useState, useEffect } from "react";

import cx from "../../helpers/cx";
import styles from "../collections.module.css";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Collections
import NewSnippet from "./new-snippet";
import Snippet from "../snippets";

function CollectionDetail({ collection, closeCollectionDetail }) {
  const [createSnippetDiv, setCreateSnippetDiv] = useState(false);
  const [snippets, setSnippets] = useState(collection.snippets);

  useEffect(() => {
    setSnippets(collection.snippets);
  }, [collection]);

  const addSnippet = (snip) => {
    const newSnippets = [...snippets, snip];
    setSnippets(newSnippets);
  };

  return (
    <div>
      <div className={styles.bgbooks}>
        <h1>
          {collection.name} <span>by {collection.owner}</span>
          <span
            className={styles.closeDetailView}
            onClick={() => {
              closeCollectionDetail(false);
              setCreateSnippetDiv(false);
            }}
          >
            <FontAwesomeIcon
              icon={faTimes}
              className={styles.addCollectionIcon}
            />
          </span>
        </h1>

        <div className={styles.snippetsContainer}>
          {snippets.map((snippet) => (
            <Snippet
              key={snippet.id}
              snip={snippet}
              collectionID={collection.id}
            />
          ))}
        </div>

        <div className={styles.addSnippetToCollectionIcon}>
          <FontAwesomeIcon
            icon={faPlus}
            className={styles.addCollectionIcon}
            onClick={() => {
              setCreateSnippetDiv(!createSnippetDiv);
            }}
          />
        </div>
      </div>

      <div
        className={cx(styles.newSnippetDiv, {
          [styles.hide]: !createSnippetDiv,
        })}
      >
        <NewSnippet
          collection={collection}
          addSnippetToCollection={addSnippet}
        />
      </div>
    </div>
  );
}

export default CollectionDetail;
