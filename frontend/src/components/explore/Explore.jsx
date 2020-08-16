import React, { useState, useEffect } from "react";
import "./explore.sass";
//api
import { getPopularCollections } from "../../helpers/api";

function Explore() {
  //states
  const [popularCollections, setPopularCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [getError, setGetError] = useState(null);
  //mount
  useEffect(() => {
    // temp
    localStorage.setItem("token", "7f32ddcb88eb6ab14e786fa3bc90b260324e0a9c");
    // temp
    console.log("[RENDERING] >> Explore ");
    async function fetchFollowedCollection() {
      console.log("[GET] >> PopularCollections");
      try {
        const response = await getPopularCollections();
        setPopularCollections(response.data);
      } catch (error) {
        console.log(`[ERROR] >> ${error.response}`);
        setGetError("Error communicating with server");
      }
    }
    fetchFollowedCollection();
    setIsLoading(false);
  }, []);

  return (
    <main className="explore">
      <header>This should be aqua yellow</header>
      <section>
        <div className="popularCollections">
          {isLoading
            ? null
            : popularCollections.map((collection) => (
                <div key={collection.id}>
                  <h4>
                    {collection.name}, {collection.id}
                  </h4>
                </div>
              ))}
        </div>
      </section>
    </main>
  );
}

export default Explore;
