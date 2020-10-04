import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

function PopCollection({ collection }) {
  const [bg, setBg] = useState(
    "https://s3.amazonaws.com/assets.mlh.io/events/splashes/000/000/392/thumb/930adc5ed398-hackmtyMLH_300x300.png?1467906271"
  );
  const coll_bg = {
    background: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2)), url(${bg}) center / cover`,
    // background: `url(${bg}) center / cover`,
  };
  let history = useHistory();

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
      className="bg"
      style={coll_bg}
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
