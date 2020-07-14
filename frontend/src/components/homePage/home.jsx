import React, { useState, useEffect } from "react";
import "./home.css";
import Navbar from "./navbar";
//API
import { getCollections } from "../../helpers/api";
import Collections from "./collections";
import SideNav from "./sidenav";

function Home() {
  //states
  const [collections, setCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  //lifecycle funcs
  useEffect(() => {
    console.log("rendering Home View");
    localStorage.removeItem("collectionId");
    async function fetchCollection() {
      console.log("fetching collection data");
      try {
        const response = await getCollections();
        setCollections(response.data);
      } catch (error) {
        console.error(error);
        setError("Error happened");
      }
      setIsLoading(false);
    }

    fetchCollection();
  }, []);

  return (
    <div className="root">
        <SideNav />
      <div className="main">
        <Navbar />
        <div className="container">
          <h1>COLLECTIONS</h1>
          <h3>POPULAR COLLECTIONS</h3>
          <div className="line" />
          <Collections collections={collections} />
        </div>
      </div>
    </div>
  );
}

export default Home;
