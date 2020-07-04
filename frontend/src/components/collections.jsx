import React, { useState, useEffect } from "react";
import { getCollections } from "../helpers/api";
import CollectionItem from "./collection-item";

export default function Collections() {
  const [collections, setCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function doStuff() {
      try {
        const response = await getCollections();
        setCollections(response.data);
      } catch (error) {
        setError("Error happened");
      }
      setIsLoading(false);
    }

    doStuff();
  }, []);

  return (
    <div>
      <h1>All collections</h1>
      {isLoading && "Loading..."}
      {error ? error : null}
      {!!collections.length &&
        collections.map((coll) => <CollectionItem {...coll} />)}
    </div>
  );
}
