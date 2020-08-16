import React, { useState, useEffect } from "react";
//ICONS
import {
  faNewspaper,
  faPodcast,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//Modules
import { useHistory } from "react-router-dom";

function SnippetSearch({ snippet }) {
  let history = useHistory();
  const [isPodcast, setIsPodcast] = useState(true);
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    if (snippet.type_of === "podcast") {
      setIsPodcast(true);
    } else {
      setIsPodcast(false);
    }
    setLikes(snippet.hearts.length);
  }, []);

  return (
    <div
      className="searchRowContainer"
      onClick={() => {
        history.push(`detail/${snippet.collection}/${snippet.id}`);
      }}
    >
      <div className={isPodcast ? "searchRowIcon bgTeal" : "searchRowIcon"}>
        {!isPodcast ? (
          <FontAwesomeIcon icon={faNewspaper} />
        ) : (
          <FontAwesomeIcon icon={faPodcast} />
        )}
      </div>
      <div className="searchRowText">
        <h4>
          {snippet.title} <span className="lighter"> {likes} HEARTS</span>
        </h4>
      </div>
    </div>
  );
}

export default SnippetSearch;
