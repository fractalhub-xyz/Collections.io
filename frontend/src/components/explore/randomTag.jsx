import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

function RandomTag({ tag }) {
  const [bg, setBg] = useState(
    "https://s3.amazonaws.com/assets.mlh.io/events/splashes/000/000/392/thumb/930adc5ed398-hackmtyMLH_300x300.png?1467906271"
  );
  const coll_bg = {
    background: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2)), url(${bg}) center / cover`,
    // background: `url(${bg}) center / cover`,
  };
  let history = useHistory();
  return (
    <div
      style={coll_bg}
      className="random-tag center"
      onClick={() => {
        history.push(`/tag/${tag.name}`);
      }}
    >
      {tag.name}
    </div>
  );
}

export default RandomTag;
