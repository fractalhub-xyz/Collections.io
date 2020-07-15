import React, { useState, useEffect } from "react";
import {
  faExternalLinkAlt,
  faUserEdit,
  faUserAltSlash,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Snippet({ snippet }) {
  //states
  const [isOwner, setIsOwner] = useState(false);
  const [isLiked, setIsLiked] = useState(true);
  //lifecycle funs
  useEffect(() => {
    if (localStorage.getItem("user") === snippet.owner) {
      setIsOwner(true);
    } else {
      setIsOwner(false);
    }
  }, []);
  return (
    <div className="tablerows">
      <div className="likecol">
        <FontAwesomeIcon
          onClick={() => {
            setIsLiked(!isLiked);
          }}
          className={isLiked ? "liked teal" : "liked"}
          icon={faHeart}
        />
      </div>
      <div className="titlecol">{snippet.title}</div>
      <div className="ownercol">{snippet.owner}</div>
      <div className="typecol">{snippet.type_of}</div>
      <div className="datecol">{snippet.timestamp.substr(0, 10)}</div>
      <div className="linkcol">
        <FontAwesomeIcon icon={faExternalLinkAlt} />
      </div>
      <div className="edicol">
        {isOwner ? (
          <FontAwesomeIcon className="edit" icon={faUserEdit} />
        ) : (
          <FontAwesomeIcon icon={faUserAltSlash} />
        )}
      </div>
    </div>
  );
}

export default Snippet;
