import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./user.sass";
function YourCollection({ collection }) {
  let history = useHistory();

  const [bg, setBg] = useState(
    "https://s3.amazonaws.com/assets.mlh.io/events/splashes/000/000/392/thumb/930adc5ed398-hackmtyMLH_300x300.png?1467906271"
  );
  const coll_bg = {
    background: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2)), url(${bg}) center / cover`,
    // background: `url(${bg}) center / cover`,
  };
  useEffect(() => {
    if (collection.tags) {
      if (collection.tags[0]) {
        console.log("tag", collection.tags[0]);
        setBg(collection.tags[0].image_urls);
      }
    }
  }, [collection]);
  return (
    <div
      className="user-collection"
      onClick={() => {
        history.push(`/collection/${collection.id}`);
      }}
    >
      <div className="card" style={coll_bg} />
      <div className="name">{collection.name}</div>
    </div>
  );
}

export default YourCollection;
