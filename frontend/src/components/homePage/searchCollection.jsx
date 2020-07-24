import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
//ICONS
import {
  faNewspaper,
  faPodcast,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function CollectionSearch({ collection }) {
  //utility fucntions
  let history = useHistory();
  const openCollection = (id) => {
    history.push("/detail/" + id);
  };
  return (
    <div
      className="searchContainer"
      onClick={() => {
        openCollection(collection.id);
      }}
    >
      <div className="searchCard"></div>
      <div className="searchText">
        <span className="searchTitle">{collection.name}</span>
        <br />
        {collection.desc}
        <br />
        made by <span className="teal"> {collection.owner}</span>
      </div>
    </div>
  );
}

export default CollectionSearch;
