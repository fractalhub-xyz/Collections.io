import React from "react";
//icons
import { Link, Mic, Movie, Description } from "@material-ui/icons";
//modules
import { useHistory } from "react-router-dom";

function OtherSnippets({ snip }) {
  let history = useHistory();
  return (
    <div
      className="otsnippet"
      onClick={() => {
        history.push(`/snippet/${snip.id}`);
      }}
    >
      <div className="card center">
        {snip.type_of === "podcast" && (
          <div>
            <Mic fontSize="large" />
          </div>
        )}
        {snip.type_of === "article" && (
          <div>
            <Description fontSize="large" />
          </div>
        )}
        {snip.type_of === "video" && (
          <div>
            <Movie fontSize="large" />
          </div>
        )}
        {snip.type_of === "link" && (
          <div>
            <Link fontSize="large" />
          </div>
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
