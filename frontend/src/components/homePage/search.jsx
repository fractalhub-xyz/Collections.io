import React, { useState } from "react";
import { getSearchResults } from "../../helpers/api";
import { randomColor } from "randomcolor";
import SnippetSearch from "./snippetSearch";
import CollectionSearch from "./searchCollection";

function Search({ searchText }) {
  //states
  const [collectionMatches, setCollectionMatches] = useState([]);
  const [snippetMatches, setSnippetMatches] = useState([]);
  const [tagMatches, setTagMatches] = useState([]);
  const [numResults, setNumResults] = useState(0);
  const [success, setSuccess] = useState(false)
  //utility fucntions
  const color = randomColor({
    luminosity: "light",
    hue: "rgba",
  });
  const mystyle = {
    background: color,
    color: "black",
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
      setSuccess(true);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={!!searchText.length ? "container" : "container dispnone"}>
      <div onClick={Search}>Search</div>
      <h1>
        {success && (
          <span>{numResults} Results</span>
        )}
      </h1>

      {!!collectionMatches.length && (
        <div className="sectionLG">
          <h2>Collections</h2>
          <div className="dispSection">
            {collectionMatches.map((collection) => (
              <CollectionSearch collection={collection} key={collection.id} />
            ))}
          </div>
        </div>
      )}
      {!!snippetMatches.length && (
        <div className="sectionSM">
          <h2>Snippets</h2>
          <div className="dispSection">
            {snippetMatches.map((snippet) => (
              <SnippetSearch key={snippet.id} snippet={snippet} />
            ))}
          </div>
        </div>
      )}
      {!!snippetMatches.length && (
        <div className="sectionSM">
          <h2>Tags</h2>
          <div className="dispSection">
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
