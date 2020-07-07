import React, { useState, useEffect, useMemo } from "react";
// CSS
import "./home.css";
// Components
import Login from "./login";
import Navbar from "./navbar";
//Context
export const Log = React.createContext()


function Home() {
  //states
  const [loggedin, setLoggedin] = useState(false);

  return (
    <div className="root">
      <Log.Provider value={[loggedin, setLoggedin]}>
        <div className={!loggedin ? "nav" : "nav visible"}>
          <Navbar />
        </div>
        <div className={!loggedin ? "super" : "super sm"}>
          <div className="welcome">Welcome to Collections!</div>
          <div className="welcomesub">
            A simple playlist manager for podcasts and articles
          </div>
          {/* temp */}
          <div className={!loggedin ? "show" : "hide"}>
            <Login />
          </div>
          {/* temp   */}
          {/* <button
            onClick={() => {
              setLoginView(!loggedin);
            }}
          >
            [TEMP] Toggle login view
          </button> */}
          {/* temp */}
        </div>

        <div
          className={
            loggedin ? "collectionContainer" : "collectionContainer hide"
          }
        ></div>
      </Log.Provider>
    </div>
  );
}

export default Home;
