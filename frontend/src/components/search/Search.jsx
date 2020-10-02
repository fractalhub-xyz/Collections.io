import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSearchResults } from "../../helpers/api";
import "./search.sass";

function Search() {
  const params = useParams();
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
        console.log("response", response);

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
      } catch (error) {
        setError(error);
      }
    };

    setQuery(params.search);
    search();
  }, [params]);

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

  return (
    <main className="search">
      <h1>Seaching for {query}</h1>
    </main>
  );
}

export default Search;
