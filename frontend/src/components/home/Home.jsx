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
  const [{ isDesktop }, dispatch] = useStateValue();

  //mount
  useEffect(() => {
    console.log("[RENDERING] >> Home ");
    async function fetchFollowedCollection() {
      console.log("[GET] >> FollowedCollections");
      setIsLoading(true);
      try {
        const response = await getFollowedCollections();
        setFollowedCollections(response.data);
      } catch (error) {
        console.log(`[ERROR] >> ${error.response}`);
        setGetError("Error communicating with server");
      }
      setIsLoading(false);
    }
    fetchFollowedCollection();
  }, []);

  // const [cover, setCover] = useState(
  //   "https://raw.githubusercontent.com/Ajay051198/Collections.io/master/frontend/src/assets/images/cover.jpeg"
  //   // "https://images.pexels.com/photos/48770/business-time-clock-clocks-48770.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
  //   // "https://images.pexels.com/photos/383568/pexels-photo-383568.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
  //   // "https://images.pexels.com/photos/3815759/pexels-photo-3815759.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
  // );
  // const coverst = {
  //   background: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.3)), url(${cover}) center / cover`,
  //   // background: `url(${cover})`,
  // };

  return (
    <div>
      {isDesktop ? (
        <main className="home">
          <header></header>
          <section>
            <div className="followedCollections">
              {isLoading ? (
                <div className="tiles">
                  {Array(6)
                    .fill("")
                    .map((_, i) => (
                      <div key={i} className="tile" />
                    ))}
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
          </section>
          <footer>
            <div className="container-bg center">
              <div className="letter center">COLLECTIONS</div>
            </div>
          </footer>
        </main>
      ) : (
        <main className="home-mobile">
          <header></header>
          <section>
            <div className="followedCollections">
              {isLoading ? (
                <div className="tiles">
                  {Array(6)
                    .fill("")
                    .map((_, i) => (
                      <div key={i} className="tile" />
                    ))}
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
                      <div className="cover" style={mystyle} />
                      <div className="info">
                        <div className="name">{collection.name}</div>
                        <div className="by">by</div>
                        <div className="owner">{collection.owner}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {getError && <div>{getError}</div>}
            </div>
          </section>
        </main>
      )}
    </div>
  );
}

export default Home;
