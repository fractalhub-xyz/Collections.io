import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

function Collections({ collection }) {
  //utility fucntions
  let history = useHistory();
  const openCollection = (id) => {
    history.push("/detail/" + id);
  };
  const [bg, setBg] = useState(
    "https://s3.amazonaws.com/assets.mlh.io/events/splashes/000/000/392/thumb/930adc5ed398-hackmtyMLH_300x300.png?1467906271"
  );

  //utitlity funcs
  const mystyle = {
    background: `url(${bg}) center / cover`,
  };

  useEffect(() => {
    if (collection.tags) {
      if (collection.tags[0]) {
        setBg(collection.tags[0].image_urls);
      }
    }
  }, [collection]);

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
