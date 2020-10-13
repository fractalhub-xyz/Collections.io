import React, { useState, useEffect } from "react";
import "./collection.sass";
//icons
import { Favorite, Mic, Description, Link, Movie } from "@material-ui/icons";

//API
import { postHeartSnippet } from "../../helpers/api";
import { getRelativeTime } from "../../helpers/time";
//modules
import { useHistory } from "react-router-dom";

function SnippetRow({ snippet }) {
  const [isLiked, setIsLiked] = useState(true);
  const [likes, setLikes] = useState(0);
  let history = useHistory();
  //lifecycle funs
  useEffect(() => {
    setIsLiked(snippet.hearts.includes(localStorage.getItem("user")));
    setLikes(snippet.hearts.length);
  }, [snippet.hearts]);

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
    <div className="snippet">
      <div
        className="deet"
        onClick={() => {
          history.push(`/snippet/${snippet.id}`);
        }}
      >
        {snippet.type_of === "podcast" && (
          <div className="mat-icon center c1">
            <Mic fontSize="default" />
          </div>
        )}
        {snippet.type_of === "article" && (
          <div className="mat-icon center c2">
            <Description fontSize="default" />
          </div>
        )}
        {snippet.type_of === "video" && (
          <div className="mat-icon center c3">
            <Movie fontSize="default" />
          </div>
        )}
        {snippet.type_of === "link" && (
          <div className="mat-icon center c4">
            <Link fontSize="default" />
          </div>
        )}
        <div className="info">
          <div className="name">{snippet.title}</div>
          <div className="owner">by {snippet.owner}</div>
        </div>
        <div className="date">{getRelativeTime(snippet.timestamp)}</div>
        <div className="likes">
          <p>{likes}</p>
          <Favorite />
        </div>
      </div>
      <div className="likeicon center" onClick={heartSnippet}>
        {isLiked ? (
          <Favorite fontSize="large" color="secondary" />
        ) : (
          <Favorite fontSize="large" />
        )}
      </div>
    </div>
  );
}

export default SnippetRow;
