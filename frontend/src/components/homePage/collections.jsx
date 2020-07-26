import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { randomColor } from "randomcolor";

function Collections({ collection }) {
  //utility fucntions
  let history = useHistory();
  const openCollection = (id) => {
    history.push("/detail/" + id);
  };

  const color = randomColor({
    luminosity: "light",
    hue: "rgb",
  });

  const mystyle = {
    background: color,
  };

  return (
    <div className="collection">
      <div
        onClick={() => {
          openCollection(collection.id);
        }}
        className="card"
        style={mystyle}
      >
        <p>{collection.name}</p>
      </div>
      <p className="card-text">
        created by <span className="cyan">{collection.owner}</span>
      </p>
      <p className="card-text">{collection.followers.length} FOLLOWERS</p>
    </div>
  );
}

export default Collections;
