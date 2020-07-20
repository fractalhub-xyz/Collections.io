import React, { useState, useEffect } from "react";
import {
  faExternalLinkAlt,
  faUserEdit,
  faUserAltSlash,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//components
import EditSnippet from "./editsnippet";
//API
import { postHeartSnippet } from "../../helpers/api";

function Snippet({ snippet, setRefresh, collectionName }) {
  //states
  const [isOwner, setIsOwner] = useState(false);
  const [isLiked, setIsLiked] = useState(true);
  const [editModal, setEditModal] = useState(false);
  //lifecycle funs
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user === snippet.owner) {
      setIsOwner(true);
    } else {
      setIsOwner(false);
    }
    setIsLiked(snippet.hearts.includes(user));
  }, []);

  //functions
  const heartSnippet = async (e) => {
    e.preventDefault();
    try {
      const response = await postHeartSnippet(snippet.id);
      setIsLiked(response.data.liked);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="tablerows">
      <div className="likecol">
        <FontAwesomeIcon
          onClick={heartSnippet}
          className={isLiked ? "liked teal" : "liked"}
          icon={faHeart}
        />
      </div>
      <div className="titlecol">{snippet.title}</div>
      <div className="ownercol">{snippet.owner}</div>
      <div className="typecol">{snippet.type_of}</div>
      <div className="datecol">{snippet.timestamp.substr(0, 10)}</div>
      <div className="linkcol">
        <a href={snippet.link} target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faExternalLinkAlt} />
        </a>
      </div>
      <div className="edicol">
        {isOwner ? (
          <FontAwesomeIcon
            onClick={() => {
              setEditModal(true);
            }}
            className="edit"
            icon={faUserEdit}
          />
        ) : (
          <FontAwesomeIcon icon={faUserAltSlash} />
        )}
      </div>
      <div>
        {editModal && (
          <EditSnippet
            setEditModal={setEditModal}
            setRefresh={setRefresh}
            snippet={snippet}
            collectionName={collectionName}
          />
        )}
      </div>
    </div>
  );
}

export default Snippet;
