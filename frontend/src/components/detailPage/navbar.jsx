import React from "react";
//ICONS
import {
  faChevronDown,
  faChevronLeft,
  faBookmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Navbar() {
  return (
    <div className="nav">
      <FontAwesomeIcon className="backIcon" icon={faChevronLeft} />
      <h1 className="moreIcon">
        <FontAwesomeIcon icon={faChevronDown} />
      </h1>
      <h1>
        <FontAwesomeIcon icon={faBookmark} />
        &nbsp;{localStorage.getItem("user")}
      </h1>
    </div>
  );
}

export default Navbar;
