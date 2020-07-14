import React, { useState, useEffect } from "react";
import "./detail.css";
import SideNav from "../homePage/sidenav";
import Navbar from "./navbar";
//API

function Detail() {
  //states
  const [collections, setCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  //lifecycle funcs

  return (
    <div className="root">
      <SideNav />
      <div className="main">
        <Navbar />
        <div className="container">
          <div className="cardShowcase"/>
          <h1>COLLECTION</h1>
        </div>
      </div>
    </div>
  );
}

export default Detail;
