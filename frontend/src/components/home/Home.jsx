import React, { useState, useEffect } from "react";
import "./home.sass";
//api
import { getFollowedCollections } from "../../helpers/api";
//componentss
import { useStateValue } from "../../helpers/stateProvider";
import { useHistory } from "react-router-dom";

function Home() {
  //states
  const [followedCollections, setFollowedCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [getError, setGetError] = useState(null);
  //globalstates\

  
  const [bg, setBg] = useState(
    "https://s3.amazonaws.com/assets.mlh.io/events/splashes/000/000/392/thumb/930adc5ed398-hackmtyMLH_300x300.png?1467906271"
  );

  const mystyle = {
    background: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2)), url(${bg}) center / cover`,
    // background: `url(${bg}) center / cover`,
  };
  //init
  let history = useHistory();
  //GlobalStates
  const [, dispatch] = useStateValue();

  //mount
  useEffect(() => {
    dispatch({
      type: "SET_PAGE",
      page: "home",
    });
    console.log("[RENDERING] >> Home ");
    setIsLoading(true);
    async function fetchFollowedCollection() {
      console.log("[GET] >> FollowedCollections");
      try {
        const response = await getFollowedCollections();
        setFollowedCollections(response.data);
      } catch (error) {
        console.log(`[ERROR] >> ${error.response}`);
        setGetError("Error communicating with server");
      }
    }
    fetchFollowedCollection();
    setIsLoading(false);
  }, []);

  return (
    <main className="home">
      <header>This should be aqua yellow</header>
      <section>
        <div className="followedCollections">
          {isLoading ? (
            <div className="tiles">
              <div className="tile" />
              <div className="tile" />
              <div className="tile" />
              <div className="tile" />
              <div className="tile" />
              <div className="tile" />
              <div className="tile" />
            </div>
          ) : (
            <div className="cards">
              {followedCollections.map((collection) => (
                <div
                  key={collection.id}
                  className="card"
                  onClick={() => {
                    history.push(`/collection/${collection.id}`);
                  }}
                >
                  <div className="more">
                    <div className="created_by">Created by</div>
                    <div className="owner">{collection.owner}</div>
                  </div>
                  <div className="cover" style={mystyle}>
                    <h4>{collection.name}</h4>
                  </div>
                </div>
              ))}
            </div>
          )}
          {getError && <div>{getError}</div>}
        </div>
        {/* <button
          onClick={() => {
            dispatch({
              type: "OPEN_FORM",
              form: "create_collection",
            });
          }}
        >
          CREATE COLLECTIOn
        </button>
        <button
          onClick={() => {
            dispatch({
              type: "OPEN_FORM",
              form: "edit_collection",
            });
          }}
        >
          EDIT COLLECTIOn
        </button> */}
        {/* <div className="tiles">
          <div className="tile">Collection</div>
          <div className="tile">Collection</div>
          <div className="tile">Collection</div>
          <div className="tile">Collection</div>
          <div className="tile">Collection</div>
          <div className="tile">Collection</div>
          <div className="tile">Collection</div>
          <div className="tile">Collection</div>
          <div className="tile">Collection</div>
          <div className="tile">Collection</div>
        </div> */}
      </section>
    </main>
  );
}

export default Home;
