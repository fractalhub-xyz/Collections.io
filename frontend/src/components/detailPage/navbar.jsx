import React, { useState } from "react";
//MODULES
import { useHistory } from "react-router-dom";
//ICONS
import {
  faSearch,
  faBookmark,
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Navbar() {
  let history = useHistory();
  const [showMore, setShowMore] = useState(false);

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("collections");
    history.push("/");
  };
  return (
    <div className="nav">
      <span>
        {showMore && (
          <h1 onClick={logout} className="logout">
            &nbsp;Logout
          </h1>
        )}
      </span>

      {showMore ? (
        <h1 className="moreIcon">
          <FontAwesomeIcon
            onClick={() => {
              setShowMore(false);
            }}
            icon={faChevronRight}
          />
        </h1>
      ) : (
        <h1 className="moreIcon">
          <FontAwesomeIcon
            onClick={() => {
              setShowMore(true);
            }}
            icon={faChevronLeft}
          />
        </h1>
      )}
      <h1>
        <FontAwesomeIcon icon={faBookmark} />
        &nbsp;{localStorage.getItem("user")}
      </h1>
    </div>
  );
}

export default Navbar;
