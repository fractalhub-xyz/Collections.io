import React, { useState, useEffect } from "react";
//ICONS
import { faHashtag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//Modules
import { useHistory } from "react-router-dom";

function TagSearch({ tag }) {
  let history = useHistory();
  return (
    <div
      className="searchContainer"
      onClick={() => {
        history.push(`tag/${tag.name}`);
      }}
    >
      <div className="searchCard bgTeal">
        <FontAwesomeIcon className="typeIcon" icon={faHashtag} />
      </div>
      <div className="searchText">
        <span className="searchTitle">{tag.name}</span>
        {/* <br />
        Collection {snippet.collection}
        <br />
        {snippet.type_of}
        <br />
        {likes} <FontAwesomeIcon icon={faHeart} /> */}
      </div>
    </div>
  );
}

export default TagSearch;
