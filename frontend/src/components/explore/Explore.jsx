import React, { useState, useEffect } from "react";
import "./explore.sass";
//api
import {
  getPopularCollections,
  getPopularSnippets,
  getRandomTags,
} from "../../helpers/api";
//components
import { useStateValue } from "../../helpers/stateProvider";
import PopCollection from "./popCollection";
import PopSnippet from "./PopSnippet";
import { LocalOffer } from "@material-ui/icons";

function Explore() {
  //GlobalStates
  const [, dispatch] = useStateValue();
  //states
  const [popularCollections, setPopularCollections] = useState([]);
  const [populartSnippets, setPopulartSnippets] = useState([]);
  const [randomTags, setRandomTags] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [getError, setGetError] = useState(null);
  //mount
  useEffect(() => {
    dispatch({
      type: "SET_PAGE",
      page: "explore",
    });
    console.log("[RENDERING] >> Explore ");
    async function fetchPopularCollections() {
      console.log("[GET] >> PopularCollections");
      try {
        const response = await getPopularCollections();
        setPopularCollections(response.data);
      } catch (error) {
        console.log(`[ERROR] >> ${error.response}`);
        setGetError("Error communicating with server");
      }
    }
    async function fetchPopularSnippets() {
      console.log("[GET] >> Popular Snippets");
      try {
        const response = await getPopularSnippets(7);
        setPopulartSnippets(response.data);
      } catch (error) {
        console.log(`[ERROR] >> ${error.response}`);
        setGetError("Error communicating with server");
      }
    }
    async function fetchRandomTags() {
      console.log("[GET] >> Random Tags");
      try {
        const response = await getRandomTags();
        setRandomTags(response.data);
      } catch (error) {
        console.log(`[ERROR] >> ${error.response}`);
        setGetError("Error communicating with server");
      }
    }
    fetchPopularCollections();
    fetchPopularSnippets();
    fetchRandomTags();
    setIsLoading(false);
  }, [dispatch]);

  return (
    <main className="explore">
      <div className="explore-container">
        <div className="left-container">
          <h1>Popular Collections</h1>
          <div className="pop-collections">
            {popularCollections.map((collection) => (
              <PopCollection key={collection.id} collection={collection} />
            ))}
          </div>
        </div>
        <div className="right-container">
          <div className="top">
            <div className="top-left">
              <h1>Popular Snippets</h1>
              <div className="pop-snippets">
                {populartSnippets.map((snippet) => (
                  <PopSnippet key={snippet.id} snippet={snippet} />
                ))}
              </div>
            </div>
            <div className="top-right">
              <h1>Tags</h1>
              {randomTags.map((tag) => (
                <div className="random-tag">
                  <LocalOffer />
                  <div className="name">{tag.name}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="bottom center">COLLECTIONS</div>
        </div>
      </div>
    </main>
  );
}

export default Explore;
