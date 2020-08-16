import React, { useState, useEffect } from "react";

//api
import { getCollectionFromID } from "../../helpers/api";
//components
//modules
import { useParams } from "react-router-dom";

function Collection() {
  //states
  const [collection, setCollection] = useState({});
  const [snippets, setSnippets] = useState([]);
  const [tags, setTags] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [getError, setGetError] = useState(null);

  const [refresh, setRefresh] = useState(true);

  const params = useParams();

  // lifecycle functions
  useEffect(() => {
    console.log("[RENDER] >> Collection");
    if (!refresh) {
      return;
    }

    async function fetchCollection() {
      try {
        console.log(`[GET] >> Collection ${params.id} details`);
        const response = await getCollectionFromID(params.id);
        setCollection(response.data);
        setSnippets(response.data.snippets);
        setTags(response.data.tags);
      } catch (error) {
        console.error(error);
        setGetError(`Failed to load collection with ID: ${params.id}`);
      }
      setIsLoading(false);
    }
    fetchCollection();
    setRefresh(false);
  }, [refresh, params]);

  return <div>{console.log(`collection ${collection.name}`)}</div>;
}

export default Collection;
