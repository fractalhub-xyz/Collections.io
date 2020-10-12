import { Description, Mic, Movie } from "@material-ui/icons";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import "./search.sass";
function SnippetSearch({ snippet }) {
  let history = useHistory();
  return (
    <div
      className={
        snippet.type_of === "podcast"
          ? "row c3"
          : snippet.type_of === "article"
          ? "row c3"
          : snippet.type_of === "video"
          ? "row c3"
          : snippet.type_of === "link"
          ? "row c3"
          : null
      }
      onClick={() => {
        history.push(`/snippet/${snippet.id}`);
      }}
    >
      <div className="info">
        {snippet.type_of === "podcast" && (
          <div className="icon">
            <Mic fontSize="medium" />
          </div>
        )}
        {snippet.type_of === "article" && (
          <div className="icon">
            <Description fontSize="medium" />
          </div>
        )}
        {snippet.type_of === "video" && (
          <div className="icon">
            <Movie fontSize="medium" />
          </div>
        )}
        {snippet.type_of === "link" && (
          <div className="icon">
            <Link fontSize="medium" />
          </div>
        )}
        <div className="title">{snippet.title}</div>
      </div>
      <div className="owner center">{snippet.owner}</div>
    </div>
  );
}

export default SnippetSearch;
