import React from "react";
import { useHistory } from "react-router-dom";
import { getCoverForTag } from "../../helpers/utils";

function RandomTag({ tag }) {
  let history = useHistory();

  return (
    <div
      style={getCoverForTag(tag)}
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
