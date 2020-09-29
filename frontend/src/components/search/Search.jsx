import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./search.sass";

function Search() {
  const [query, setQuery] = useState("");
  const [refresh, setRefresh] = useState(true);
  const [error, setError] = useState(null);
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setQuery(params.search);
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
