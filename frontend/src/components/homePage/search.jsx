import React, { useState } from "react";
import { getSearchResults } from "../../helpers/api";
import { randomColor } from "randomcolor";
import SnippetSearch from "./snippetSearch";
import CollectionSearch from "./searchCollection";
import TagSearch from "./tagSearch";

//Modules
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

function Search({ searchText }) {
  //states
  const [collectionMatches, setCollectionMatches] = useState([]);
  const [snippetMatches, setSnippetMatches] = useState([]);
  const [tagMatches, setTagMatches] = useState([]);
  const [numResults, setNumResults] = useState(0);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
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
      setIsLoading(true);
      const response = await getSearchResults(searchText);
      setCollectionMatches(response.data.result.collections);
      setSnippetMatches(response.data.result.snippets);
      setTagMatches(response.data.result.tags);
      setNumResults(
        response.data.result.collections.length +
          response.data.result.snippets.length +
          response.data.result.tags.length
      );
      setIsLoading(false);
      setSuccess(true);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className={!!searchText.length ? "container" : "container dispnone"}>
      <div onClick={Search}>Search</div>
      <h1>{success && <span>{numResults} Results</span>}</h1>
      {error ? (
        <h3>{error}</h3>
      ) : isLoading ? (
        <div className="loader">
          <Loader
            type="Grid"
            color="#00BFFF"
            height={50}
            width={50}
            timeout={3000} //3 secs
          />
        </div>
      ) : (
        <div>
          {!!collectionMatches.length && (
            <div className="sectionLG">
              <h2>Collections</h2>
              <div className="dispSection">
                {collectionMatches.map((collection) => (
                  <CollectionSearch
                    collection={collection}
                    key={collection.id}
                  />
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
          {!!tagMatches.length && (
            <div className="sectionSM">
              <h2>Tags</h2>
              <div className="dispSection">
                {tagMatches.map((tag) => (
                  <TagSearch key={tag.name} tag={tag} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Search;
