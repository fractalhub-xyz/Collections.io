import React from "react";
//ICONS
import {
  faChevronDown,
  faChevronLeft,
  faBookmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//MODULES
import { useHistory } from "react-router-dom";

function Navbar() {
  let history = useHistory();
  const redirect = () => {
    history.push("/home");
  };
  return (
    <div className="nav">
      <FontAwesomeIcon
        onClick={redirect}
        className="backIcon"
        icon={faChevronLeft}
      />
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
