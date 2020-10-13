import React from "react";
import { useHistory } from "react-router-dom";
import "./user.sass";
import { getCoverForCollection } from "../../helpers/utils";


function YourCollection({ collection }) {
  let history = useHistory();
  return (
    <div
      className="user-collection"
      onClick={() => {
        history.push(`/collection/${collection.id}`);
      }}
    >
      <div className="card" style={getCoverForCollection(collection)} />
      <div className="name">{collection.name}</div>
    </div>
  );
}

export default YourCollection;
