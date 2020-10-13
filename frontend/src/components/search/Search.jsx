import React, { useCallback, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { getSearchResults, getSearchAllResults } from "../../helpers/api";
import "./search.sass";
import CollectionSearch from "./collectionSearch";
import SnippetSearch from "./snippetSearch";
import TagSearch from "./tagSearch";
import UserSearch from "./userSearch";
import { debounce } from "@material-ui/core";

function Search() {
  const params = useParams();
  let history = useHistory();

  const [query, setQuery] = useState(params.search);
  const [refresh, setRefresh] = useState(true);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // result
  const [collectionMatches, setCollectionMatches] = useState([]);
  const [snippetMatches, setSnippetMatches] = useState([]);
  const [tagMatches, setTagMatches] = useState([]);
  const [userMatches, setUserMatches] = useState([]);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const search = async () => {
      setCollectionMatches([]);
      setSnippetMatches([]);
      setTagMatches([]);
      setUserMatches([]);

      try {
        setIsLoading(true);
        const response = await getSearchResults(params.search);

        if (response.data.result.collections) {
          setCollectionMatches(response.data.result.collections);
        }

        if (response.data.result.snippets) {
          setSnippetMatches(response.data.result.snippets);
        }

        if (response.data.result.tags) {
          setTagMatches(response.data.result.tags);
        }

        if (response.data.result.users) {
          setUserMatches(response.data.result.users);
        }
        setQuery(params.search);
        setIsLoading(false);
        setSuccess(true);
      } catch (error) {
        setError(error);
      }
    };
    search();
  }, [params]);

  const get_all = async (q) => {
    setCollectionMatches([]);
    setSnippetMatches([]);
    setTagMatches([]);
    setUserMatches([]);
    try {
      setIsLoading(true);
      const response = await getSearchAllResults(q);

      if (response.data.result.collections) {
        setCollectionMatches(response.data.result.collections);
      }

      if (response.data.result.snippets) {
        setSnippetMatches(response.data.result.snippets);
      }

      if (response.data.result.tags) {
        setTagMatches(response.data.result.tags);
      }

      if (response.data.result.users) {
        setUserMatches(response.data.result.users);
        console.log(response.data.result.users);
      }
      setIsLoading(false);
      setSuccess(true);
    } catch (eror) {
      setError(error);
    }
  };

  // lifecycle functions
  useEffect(() => {
    console.log("[RENDER] >> Searching");
    if (!refresh) {
      return;
    }
    async function commenseSearch() {
      try {
        console.log(`[GET] >> Search ${query} details`);
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    }
    commenseSearch();
    setRefresh(false);
  }, [refresh, query]);

  const debouncedHandler = useCallback(
    debounce((value) => {
      history.push(`/search/${value}`);
    }, 500),
    []
  );

  const inputOnChange = (e) => {
    const value = e.target.value;
    debouncedHandler(value);
  };

  return (
    <main className="search">
      <div className="left">
        <input
          placeholder="Search"
          className="searchInput"
          onChange={inputOnChange}
        />
        <img
          className="search-logo"
          src="https://www.iconfinder.com/data/icons/hawcons/32/698627-icon-111-search-512.png"
          alt="sh-lg"
        />
        <h1>Search</h1>
        <p className="aa">Use :Collectionname to search for Collections</p>
        <p className="a3">Use Snippetname to search for Snippet</p>
        <p className="a8">Use !Tagname to search for tags</p>
        <p className="a7">Use @Username to search for Users</p>
      </div>
      <div className="right">
        <h1>Results</h1>
        <div>
          {!!collectionMatches.length && (
            <div>
              <div className="header-row">
                <h2>Collections</h2>
                <p
                  onClick={() => {
                    if (query[0] === "@") {
                      get_all(`${query}`);
                    } else {
                      get_all(`:${query}`);
                    }
                  }}
                >
                  see all
                </p>
              </div>
              <div>
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
            <div>
              <div className="header-row">
                <h2>Snippets</h2>
                <p
                  onClick={() => {
                    if (query[0] === "@") {
                      get_all(`${query}`);
                    } else {
                      get_all(`>${query}`);
                    }
                  }}
                >
                  see all
                </p>
              </div>
              <div>
                {snippetMatches.map((snippet) => (
                  <SnippetSearch key={snippet.id} snippet={snippet} />
                ))}
              </div>
            </div>
          )}
          {!!tagMatches.length && (
            <div>
              <div className="header-row">
                <h2>Tags</h2>
                <p
                  onClick={() => {
                    if (query[0] === "@") {
                      get_all(`${query}`);
                    } else {
                      get_all(`!${query}`);
                    }
                  }}
                >
                  see all
                </p>
              </div>
              <div>
                {tagMatches.map((tag) => (
                  <TagSearch key={tag.name} tag={tag} />
                ))}
              </div>
            </div>
          )}
          {!!userMatches.length && (
            <div>
              <div className="header-row">
                <h2>Users</h2>
                <p
                  onClick={() => {
                    if (query[0] === "@") {
                      get_all(`${query}`);
                    } else {
                      get_all(`@${query}`);
                    }
                  }}
                >
                  see all
                </p>
              </div>
              <div>
                {userMatches.map((user) => (
                  <UserSearch user={user} key={user.username} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default Search;
