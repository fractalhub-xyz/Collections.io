import React, { useState, useEffect } from "react";
import "./home.css";

//API
import { getCollections } from "../../helpers/api";
//components
import Collections from "./collections";
import SideNav from "./sidenav";
import Navbar from "./navbar";
import Search from "./search";

function Home() {

  //states
  const [collections, setCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [searchText, setSearchText] = useState("");
  //lifecycle funcs
  useEffect(() => {
    console.log("rendering Home View");
    async function fetchCollection() {
      console.log("fetching collection data");
      try {
        const response = await getCollections();
        setCollections(response.data);
        localStorage.setItem("collections", response.data);
      } catch (error) {
        console.error(error);
        setError("Error happened");
      }
      setIsLoading(false);
    }

    fetchCollection(refresh);
    setRefresh(false);
  }, [refresh]);

  useEffect(() => {
    console.log(searchText);
  }, [searchText]);

  return (
    <div className="root">
      <SideNav setRefresh={setRefresh} />
      <div className="main">
        <Navbar searchText={searchText} setSearchText={setSearchText} />
        <div
          className={!searchText.length ? "container" : "container dispnone"}
        >
          <h1>COLLECTIONS</h1>
          <h3>POPULAR COLLECTIONS</h3>
          <div className="line" />
          {error && <h4>{error}</h4>}
          {isLoading && <h4>Loading..</h4>}
          <div>
            {collections.map((collection) => (
              <Collections key={collection.id} collection={collection} />
            ))}
          </div>
        </div>

        <Search searchText={searchText} />
      </div>
    </div>
  );
}

export default Home;
