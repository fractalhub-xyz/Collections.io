import React, { useState, useEffect } from "react";
//CSS
import styles from "./collections.module.css";
//components
import { getCollections } from "../helpers/api";

function Collections() {
  const [collections, setCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchCollection() {
      try {
        const response = await getCollections();
        setCollections(response.data);
      } catch (error) {
        setError("Error happened");
      }
      setIsLoading(false);
    }

    fetchCollection();
  }, []);

  const open = (pk) => {
      alert(`SUP BOI ${pk}`)

  }

  return (
    <div className={styles.collectionContainer}>
      {collections.map((collection) => (
        <div className={styles.collection} onClick={()=>{open(collection.id)}}>
          <div className={styles.name}>{collection.name}</div>
          <div className={styles.owner}>by&nbsp;{collection.owner}</div>
        </div>
      ))}
    </div>
  );
}

export default Collections;
