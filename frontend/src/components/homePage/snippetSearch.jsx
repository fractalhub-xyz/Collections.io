import React, { useState, useEffect } from "react";
//ICONS
import { faNewspaper, faPodcast, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SnippetSearch({ snippet }) {
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
    <div className="searchContainer">
      <div className={isPodcast ? "searchCard bgTeal" : "searchCard"}>
        {!isPodcast ? (
          <FontAwesomeIcon className="typeIcon" icon={faNewspaper} />
        ) : (
          <FontAwesomeIcon className="typeIcon" icon={faPodcast} />
        )}
      </div>
      <div className="searchText">
        <span className="searchTitle">{snippet.title}</span>
        <br />
        Collection {snippet.collection}
        <br />
        {snippet.type_of}
        <br />
        {likes} <FontAwesomeIcon icon={faHeart} />
      </div>
    </div>
  );
}

export default SnippetSearch;
