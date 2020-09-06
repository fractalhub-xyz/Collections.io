import React, { useState } from "react";
import "./sidenav.sass";
//modules
import { useHistory } from "react-router-dom";

const ITEMS = [
  { title: "Home", url: "/home" , icon : "H"},
  { title: "Explore", url: "/explore" , icon : "E"},
];

function Sidenav() {
  //init
  let history = useHistory();
  const [activeUrl, setActiveUrl] = useState(window.location.pathname);

  return (
    <main className="side-nav">
      <div className="container">
        {ITEMS.map(({ title, url, icon }) => (
          <>
            <div className="gap" />
            <div
              className={activeUrl === url ? "nav-button active" : "nav-button"}
              onClick={() => {
                setActiveUrl(url);
                history.push(url);
              }}
            >
              <div className="icon">{icon}</div>
              <div className="link">{title}</div>
            </div>
          </>
        ))}
      </div>
    </main>
  );
}

export default Sidenav;
