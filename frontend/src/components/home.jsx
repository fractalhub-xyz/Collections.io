import React, { useState, useEffect, useMemo } from "react";
// CSS
import "./home.css";
// Components
import Login from "./login";
import Navbar from "./navbar";
import Collections from "./collections";
import { postNewCollection } from "../helpers/api";
//Context
export const Log = React.createContext();

function Home() {
  //states
  const [loggedin, setLoggedin] = useState(false);
  //funcs

  // csrfmiddlewaretoken: Hr0ug4QPiu18HlyE7rM5CoxIPut5F0XOhInwlKHUELnkRYRRF1BvqojAHHiOhuhz;
  // name: example8;
  // desc: xxxx;

  const createCollection = async (e) => {
    e.preventDefault();
    // temp
    const payload = {
      Authorization: `Token ${localStorage.getItem("token")}`,
      name: "created from react",
      desc: "pls wurk",
    };
    const data = payload;
    try {
      const response = await postNewCollection(data);
      console.log(response);
      console.log("Succesfully created new collection");
    } catch {
      console.log("Failed to create a new collection");
    }
  };
  return (
    <div className="root">
      <Log.Provider value={[loggedin, setLoggedin]}>
        <div className={!loggedin ? "nav" : "nav visible"}>
          <Navbar />
        </div>
        <div className={!loggedin ? "super" : "super sm"}>
          <div className={!loggedin ? "welcome" : "welcome shrink"}>
            Welcome to Collections! <span className="username">{localStorage.getItem("user")}</span>
          </div>
          <div className={!loggedin ? "welcomesub" : "hide"}>
            A simple playlist manager for podcasts and articles
          </div>
          {/* temp */}
          <div className={!loggedin ? "show" : "hide"}>
            <Login />
          </div>
        </div>

        <div className={loggedin ? "bodyContainer" : "bodyContainer hide"}>
          <Collections />
          <button onClick={createCollection}>Create collection</button>
        </div>
      </Log.Provider>
    </div>
  );
}

export default Home;
