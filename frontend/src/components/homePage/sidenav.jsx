import React from "react";
//ICONS
import { faHome, faFolderOpen, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//MODULES
import { useHistory } from "react-router-dom";

function SideNav() {
  let history = useHistory();
  const redirectHome = () => {
    history.push("/home");
  };
  const rediretExplore = () => {
    history.push("/");
  };
  return (
    <div className="sidenav">
      <div className="sidenav-container">
        <div className="dotdotdot" onClick={() => {}}>
          ...
        </div>
        <div className="sidenav-link" onClick={redirectHome}>
          {" "}
          <FontAwesomeIcon icon={faHome} />
          &nbsp;HOME
        </div>
        <div className="sidenav-link" onClick={rediretExplore}>
          {" "}
          <FontAwesomeIcon icon={faFolderOpen} />
          &nbsp;EXLPORE - TEMP(LOGIN)
        </div>
        <div className="line" />
        <h4>YOUR COLLECTIONS</h4>
        <p>TEMP FETCH COLLECTIONS FROM THE OWNER</p>
        <div className="line" />
        <div className="addCollection sidenav-link">
          ADD COLLECTION&nbsp;
          <FontAwesomeIcon icon={faPlusCircle} />
        </div>
      </div>
    </div>
  );
}

export default SideNav;
