import React from "react";
//icons
import {
  Favorite,
  Link,
  Mic,
  MoreVert,
  Movie,
  PlaylistAdd,
  Search,
  Description,
} from "@material-ui/icons";
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
          <Mic fontSize="large" />
        ) : (
          <Description fontSize="large" />
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
