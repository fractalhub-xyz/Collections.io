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

  const [bg, setBg] = useState(
    "https://s3.amazonaws.com/assets.mlh.io/events/splashes/000/000/392/thumb/930adc5ed398-hackmtyMLH_300x300.png?1467906271",
  );

  const coll_bg = {
    background: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2)), url(${bg}) center / cover`,
    // background: `url(${bg}) center / cover`,
  };

  //global states
  const [, dispatch] = useStateValue();

  const params = useParams();

  // lifecycle functions
  useEffect(() => {
    dispatch({
      type: "SET_PAGE",
      page: "collection_detail",
    });
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
      <header>
        <div className="detail">
          <div className="stats"></div>
          <div className="card" style={coll_bg}></div>
          <div className="info">
            <div className="name">{collection.name}</div>
            <div className="owner">
              by<strong>&nbsp;{collection.owner}</strong>
            </div>
            <br />
            <div className="desc">{collection.desc}</div>
          </div>
        </div>
      </header>
      <section>SECTION</section>
      <button
        onClick={() => {
          dispatch({ type: "OPEN_FORM", form: "sdfsd" });
        }}
      >
        OPEN MODAL
      </button>
    </main>
  );
}

export default Collection;
