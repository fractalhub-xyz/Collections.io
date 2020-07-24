import React, { useState } from "react";
import { getSearchResults } from "../../helpers/api";
import { useHistory } from "react-router-dom";
import { randomColor } from "randomcolor";
import SnippetSearch from "./snippetSearch";

function Search({ searchText }) {
  //states
  const [collectionMatches, setCollectionMatches] = useState([]);
  const [snippetMatches, setSnippetMatches] = useState([]);
  const [tagMatches, setTagMatches] = useState([]);
  const [numResults, setNumResults] = useState(0);
  //utility fucntions
  let history = useHistory();
  const openCollection = (id) => {
    history.push("/detail/" + id);
  };

  const color = randomColor({
    luminosity: "light",
    hue: "rgba",
  });
  const mystyle = {
    background: color,
  };

  //functions
  const Search = async (e) => {
    e.preventDefault();
    try {
      setCollectionMatches([]);
      const response = await getSearchResults(searchText);
      setCollectionMatches(response.data.result.collections);
      setSnippetMatches(response.data.result.snippets);
      setNumResults(
        response.data.result.collections.length +
          response.data.result.snippets.length
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={!!searchText.length ? "container" : "container dispnone"}>
      <div onClick={Search}>Search</div>
      <h1>{!!collectionMatches.length && <span>{numResults} Results</span>}</h1>

      {!!collectionMatches.length && (
        <div className="sectionLG">
          <h2>Collections</h2>
          {collectionMatches.map((collection) => (
            <div className="collection" key={collection.id}>
              <div
                onClick={() => {
                  openCollection(collection.id);
                }}
                className="card"
                style={mystyle}
              >
                {/* <img src={""} alt="TEMP"></img> */}
                <p>{collection.name}</p>
              </div>
              <p className="card-text">
                created by <span className="cyan">{collection.owner}</span>
              </p>
              <p className="card-text">
                {/* {totLikes} HEARTS, {totFollowers} FOLLOWERS */}
              </p>
            </div>
          ))}
        </div>
      )}
      {!!snippetMatches.length && (
        <div className="sectionSM">
          <h2>Snippets</h2>
          <div className="snippetSection">
            {snippetMatches.map((snippet) => (
              <SnippetSearch key={snippet.id} snippet={snippet} />
            ))}
          </div>
        </div>
      )}
      {!!snippetMatches.length && (
        <div className="sectionSM">
          <h2>Tags</h2>
          <div className="snippetSection">
            {snippetMatches.map((snippet) => (
              <SnippetSearch key={snippet.id} snippet={snippet} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Search;
