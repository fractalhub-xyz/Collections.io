import React from "react";

function Search({ searchText }) {
  return (
    <div className={!!searchText.length ? "container" : "container dispnone"}>
      <h1>{searchText}</h1>
    </div>
  );
}

export default Search;
