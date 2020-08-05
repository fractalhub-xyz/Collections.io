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
//modules
import ReactTooltip from "react-tooltip";
import { useHistory } from "react-router-dom";

function Snippet({ snippet, setRefresh, collectionName }) {
  let history = useHistory();
  //states
  const [isOwner, setIsOwner] = useState(false);
  const [isLiked, setIsLiked] = useState(true);
  const [editModal, setEditModal] = useState(false);
  const [likes, setLikes] = useState(0);

  //lifecycle funs
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user === snippet.owner) {
      setIsOwner(true);
    } else {
      setIsOwner(false);
    }
    setIsLiked(snippet.hearts.includes(user));
    setLikes(snippet.hearts.length);
  }, []);

  //functions
  const heartSnippet = async (e) => {
    e.preventDefault();
    try {
      const response = await postHeartSnippet(snippet.id);
      if (response.data.success === true) {
        if (response.data.liked === false) {
          setLikes(likes - 1);
        } else {
          setLikes(likes + 1);
        }
      }
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
      <div
        className="titlecol"
        onClick={() => {
          history.push(`${snippet.collection}/${snippet.id}`);
        }}
      >
        {snippet.title}
      </div>
      <div className="likescol">{likes}</div>
      <div className="ownercol">{snippet.owner}</div>
      <div className="typecol">{snippet.type_of}</div>
      <div className="datecol">{snippet.timestamp.substr(0, 10)}</div>
      <div className="linkcol">
        <a
          data-text-color="#00fff0"
          data-tip={snippet.link}
          href={snippet.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faExternalLinkAlt} />
        </a>
      </div>
      <div data-tip={isOwner ? "edit snippet" : ""} className="edicol">
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
            redirect={false}
          />
        )}
      </div>
      <ReactTooltip />
    </div>
  );
}

export default Snippet;
