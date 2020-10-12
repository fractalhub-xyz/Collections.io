import { LocalOffer } from "@material-ui/icons";
import React from "react";
import { useHistory } from "react-router-dom";
import "./search.sass";
function TagSearch({ tag }) {
  let history = useHistory();
  return (
    <div
      className="row c8"
      onClick={() => {
        history.push(`/tag/${tag.name}`);
      }}
    >
      <div className="info">
        <div className="icon">
          <LocalOffer />
        </div>
        <div className="title">{tag.name}</div>
      </div>
    </div>
  );
}

export default TagSearch;
