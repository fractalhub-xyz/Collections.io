import { CollectionsBookmark } from "@material-ui/icons";
import React from "react";
import { useHistory } from "react-router-dom";
import "./search.sass";
function CollectionSearch({ collection }) {
  let history = useHistory();
  return (
    <div
      className="row ca"
      onClick={() => {
        history.push(`/collection/${collection.id}`);
      }}
    >
      <div className="info">
        <div className="icon">
          <CollectionsBookmark />
        </div>
        <div className="title">{collection.name}</div>
      </div>
      <div className="owner center">{collection.owner}</div>
    </div>
  );
}

export default CollectionSearch;
