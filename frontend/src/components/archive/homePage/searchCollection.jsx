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

  const [bg, setBg] = useState(
    "https://s3.amazonaws.com/assets.mlh.io/events/splashes/000/000/392/thumb/930adc5ed398-hackmtyMLH_300x300.png?1467906271"
  );
  useEffect(() => {
    if (collection.tags) {
      if (collection.tags[0]) {
        setBg(collection.tags[0].image_urls);
      }
    }
  }, [collection]);

  //utitlity funcs
  const mystyle = {
    background: `url(${bg}) center / cover`,
  };
  return (
    <div
      className="searchContainer"
      onClick={() => {
        openCollection(collection.id);
      }}
    >
      <div className="searchCard" style={mystyle}></div>
      <div className="searchText">
        <span className="searchTitle">{collection.name}</span>
        <div>
          {collection.desc.substring(0, 50)}{" "}
          {collection.desc.length > 50 && <span>...</span>}
        </div>
        made by <span className="teal"> {collection.owner}</span>
      </div>
    </div>
  );
}

export default CollectionSearch;
