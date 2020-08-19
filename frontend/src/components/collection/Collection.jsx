import React, { useState, useEffect } from "react";
import "./collection.sass";

//api
import { getCollectionFromID } from "../../helpers/api";
//components
//modules
import { useParams } from "react-router-dom";
import { useStateValue } from "../../helpers/stateProvider";

function Collection() {
  //states
  const [collection, setCollection] = useState({});
  const [snippets, setSnippets] = useState([]);
  const [tags, setTags] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [getError, setGetError] = useState(null);

  const [refresh, setRefresh] = useState(true);

  //global states
  const [, dispatch] = useStateValue();

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

  return (
    <main className="collection">
      <header>{collection.name}</header>
      <section>{collection.desc}</section>
      <button
        onClick={() => {
          dispatch({ type: "TOGGLE_MODAL", modal: true });
        }}
      >
        OPEN MODAL
      </button>
    </main>
  );
}

export default Collection;
