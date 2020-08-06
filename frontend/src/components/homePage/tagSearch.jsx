import React, { useState, useEffect } from "react";
//ICONS
import { faHashtag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//Modules
import { useHistory } from "react-router-dom";

function TagSearch({ tag }) {
  let history = useHistory();
  const [bg, setBg] = useState(
    "https://s3.amazonaws.com/assets.mlh.io/events/splashes/000/000/392/thumb/930adc5ed398-hackmtyMLH_300x300.png?1467906271"
  );

  useEffect(() => {
    if (tag.image_urls) {
      setBg(tag.image_urls);
    }
  }, [tag]);

  //utitlity funcs
  const mystyle = {
    background: `url(${bg}) center / cover`,
  };
  return (
    <div
      className="searchRowContainer"
      onClick={() => {
        history.push(`tag/${tag.name}`);
      }}
    >
      <div className="searchRowIcon bgTeal" style={mystyle}>
        <FontAwesomeIcon icon={faHashtag} />
      </div>
      <div className="searchRowText">
        <span className="searchTitle">{tag.name}</span>
        {/* <br />
        Collection {snippet.collection}
        <br />
        {snippet.type_of}
        <br />
        {likes} <FontAwesomeIcon icon={faHeart} /> */}
      </div>
    </div>
  );
}

export default TagSearch;
