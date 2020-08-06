import React, { useState, useEffect } from "react";
import "./home.css";

//API
import { getFollowedCollections } from "../../helpers/api";
//components
import Collections from "./collections";
import SideNav from "../common/sidenav";
import Navbar from "./navbar";
import Search from "./search";
import Carousel from "./carousel";
//Modules
import { useHistory } from "react-router-dom";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from 'react-loader-spinner'

function Home() {
  let history = useHistory();
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
        const response = await getFollowedCollections();
        setCollections(response.data);
      } catch (error) {
        console.error(error);
        setError("Error happened");
      }
      setIsLoading(false);
    }

    fetchCollection(refresh);
    setRefresh(false);
  }, [refresh]);

  return (
    <div className="root">
      <div className="main">
        <Navbar searchText={searchText} setSearchText={setSearchText} />
        <div
          className={!searchText.length ? "container" : "container dispnone"}
        >
          <h1>COLLECTIONS</h1>
          {error && <h4>{error}</h4>}
          <Carousel title="Followed Collections">
            {!collections.length && !isLoading && (
              <h4
                className="follow-message"
                onClick={() => {
                  history.push("/explore");
                }}
              >
                Follow collections to get started !<br />
                <br />
                ───▄▀▀▀▄▄▄▄▄▄▄▀▀▀▄───
                <br />
                ───█▒▒░░░░░░░░░▒▒█───
                <br />
                ────█░░█░░░░░█░░█────
                <br />
                ─▄▄──█░░░▀█▀░░░█──▄▄─
                <br />
                █░░█─▀▄░░░░░░░▄▀─█░░█
                <br />
              </h4>
            )}
            {isLoading && (
              <Loader
                type="Grid"
                color="#00BFFF"
                height={50}
                width={50}
                timeout={3000} //3 secs
              />
            )}
            {collections.map((collection) => (
              <Collections key={collection.id} collection={collection} />
            ))}
          </Carousel>
        </div>
        <Search searchText={searchText} />
      </div>
    </div>
  );
}

export default Home;
