import React, { useState, useEffect } from "react";
import "./collection.sass";
//icons
import { Favorite, FavoriteOutlined, Search } from "@material-ui/icons";
import Podcast from "../../assets/svgs/podcasts.svg";
import Article from "../../assets/svgs/articles_green.svg";
//API
import { postHeartSnippet } from "../../helpers/api";

function SnippetRow({ snippet }) {
  const [isLiked, setIsLiked] = useState(true);
  const [likes, setLikes] = useState(0);

  //lifecycle funs
  useEffect(() => {
    setIsLiked(snippet.hearts.includes(localStorage.getItem("user")));
    setLikes(snippet.hearts.length);
    console.log(snippet);
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
    <div className="snippet">
      <div
        className={isLiked ? "icon center red" : "icon center"}
        onClick={heartSnippet}
      >
        <Favorite />
      </div>
      <div className="title">{snippet.title}</div>
      {snippet.type_of === "podcast" ? (
        <img src={Podcast} alt="Podcast" />
      ) : (
        <img src={Article} alt="Article" />
      )}
    </div>
  );
}

export default SnippetRow;
