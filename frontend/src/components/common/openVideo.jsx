import React from "react";
import { isMobile } from "react-device-detect";
import { useStateValue } from "../../helpers/stateProvider";

function OpenVideo() {
  const [{ id }] = useStateValue();
  return (
    <div>
      {!isMobile ? (
        <iframe
          width="1120"
          height="730"
          src={id}
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      ) : (
        <iframe
          width="350"
          height="200"
          src={id}
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      )}
    </div>
  );
}

export default OpenVideo;
