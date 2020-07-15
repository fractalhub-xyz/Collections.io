import React, { useState, useEffect } from "react";
import "./detail.css";
import SideNav from "../homePage/sidenav";
import Navbar from "./navbar";
//API
import { getCollectionFromID } from "../../helpers/api";
//components
import Snippet from "./snippet";

//ICONS
import {
  faHeart,
  faPlusCircle,
  faExternalLinkAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Detail() {
  //states
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [liked, setLiked] = useState(true);
  const [collection, setCollection] = useState({});
  const [snippets, setSnippets] = useState([]);

  //lifcycle funcs
  useEffect(() => {
    console.log("rendering Detail View");
    const id = localStorage.getItem("collectionId");
    async function fetchCollection() {
      console.log(`fetching collection ${id} details`);
      try {
        const response = await getCollectionFromID(id);
        setCollection(response.data);
        setSnippets(response.data.snippets);
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
          <div className="cardDetails">
            <div className="collectioncard">{collection.name}</div>
            <div className="collectionText">
              <div className="likes">31263 HEARTS</div>
              <div>
                <FontAwesomeIcon
                  onClick={() => {
                    setLiked(!liked);
                  }}
                  className={liked ? "like teal" : "like"}
                  icon={faHeart}
                />
              </div>
              <div className="type">COLLECTION</div>
              <div className="name">{collection.name}</div>
              <div className="desc">{collection.desc}</div>
              <div className="count">12 Articles, 2 Podcast</div>
              <div className="owner">
                created by <span className="teal">{collection.owner}</span>
              </div>
            </div>
          </div>
          <input placeholder="SEARCH" />
          <FontAwesomeIcon
            onClick={() => {}}
            className="addSnippet"
            icon={faPlusCircle}
          />
          <div className="tableheaders">
            <div className="likecol">HEART</div>
            <div className="titlecol">TITLE</div>
            <div className="ownercol">OWNER</div>
            <div className="typecol">TYPE</div>
            <div className="datecol">CREATED ON</div>
            <div className="linkcol">LINK</div>
            <div className="edicol">EDIT</div>
          </div>
          <div>
            {snippets.map((snippet) => (
              <Snippet snippet={snippet} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;
