import React from "react";
//icons
import Podcast from "../../assets/svgs/podcasts.svg";
import Article from "../../assets/svgs/articles_green.svg";
import URL from "../../assets/svgs/URLs.svg";
import Video from "../../assets/svgs/videos.svg";
//modules
import { useHistory } from "react-router-dom";

function OtherSnippets({ snip }) {
  let history = { useHistory };
  return (
    <div
      className="otsnippet"
      onClick={() => {
        history.push(`/snippet/${snip.id}`);
      }}
    >
      <div className="card center">
        {snip.type_of === "podcast" ? (
          <img src={Podcast} alt="Podcast" />
        ) : (
          <img src={Article} alt="Article" />
        )}
      </div>
      <div className="info">
        <div className="type">{snip.type_of}</div>
        <div className="title">{snip.title}</div>
      </div>
    </div>
  );
}

export default OtherSnippets;
