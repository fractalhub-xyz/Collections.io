import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getCoverForCollection } from "../../helpers/utils";

function PopCollection({ collection }) {
  let history = useHistory();

  return (
    <div
      className="bg"
      style={getCoverForCollection(collection)}
      onClick={() => {
        history.push(`collection/${collection.id}`);
      }}
    >
      <div className={"pop-collection"}>
        <p>{collection.name}</p>
      </div>
    </div>
  );
}

export default PopCollection;
