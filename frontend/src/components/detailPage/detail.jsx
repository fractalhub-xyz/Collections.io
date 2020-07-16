import React, { useState, useEffect } from "react";
import "./detail.css";
import SideNav from "../homePage/sidenav";
import Navbar from "./navbar";
import NewSnippet from "./newsnippet";
//API
import { getCollectionFromID } from "../../helpers/api";
//components
import Snippet from "./snippet";
import EditCollection from "./editcollection"

//ICONS
import {
  faHeart,
  faPlusCircle,
  faUserEdit,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Collections from "../homePage/collections";

function Detail() {
  //states
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [liked, setLiked] = useState(true);
  const [collection, setCollection] = useState({});
  const [snippets, setSnippets] = useState([]);
  const [modalView, setModalView] = useState(false);
  const [editCollectionModal, setEditCollectionModal] = useState(false)
  const [refresh, setRefresh] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
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
    setRefresh(false);
  }, [refresh]);

  //lifecycle funs
  useEffect(() => {
    if (localStorage.getItem("user") === collection.owner) {
      setIsOwner(true);
    } else {
      setIsOwner(false);
    }
  }, [collection]);

  return (
    <div className="root">
      <SideNav setRefresh={setRefresh} />
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
            <div>
              {isOwner && (
                <FontAwesomeIcon
                  onClick={() => {
                    setEditCollectionModal(true);
                  }}
                  className="deleteIcon"
                  icon={faUserEdit}
                />
              )}
            </div>
          </div>
          <input placeholder="SEARCH" />
          <FontAwesomeIcon
            onClick={() => {
              setModalView(true);
            }}
            className="addSnippet"
            icon={faPlusCircle}
          />
          <div className="tableheaders">
            <div className="likecol">
              <FontAwesomeIcon icon={faHeart} />
            </div>
            <div className="titlecol">TITLE</div>
            <div className="ownercol">OWNER</div>
            <div className="typecol">TYPE</div>
            <div className="datecol">CREATED ON</div>
            <div className="linkcol">LINK</div>
            <div className="edicol">EDIT</div>
          </div>
          <div className="snippetList">
            {isLoading && <div className="loader">ISA LOADING</div>}
            {!snippets.length && (
              <h4 className="oops">
                ¯\_( ͡❛ ͜ʖ ͡❛)_/¯
                <br />
                ISA EMPTY
              </h4>
            )}
            {snippets.map((snippet) => (
              <Snippet
                key={snippet.id}
                snippet={snippet}
                setRefresh={setRefresh}
              />
            ))}
          </div>
        </div>
      </div>
      <div>
        {modalView && (
          <NewSnippet
            setModalView={setModalView}
            collectionID={collection.id}
            setRefresh={setRefresh}
          />
        )}
      </div>
      <div>
        {editCollectionModal && (
          <EditCollection
            setEditCollectionModal={setEditCollectionModal}
            setRefresh={setRefresh}
            collection={collection}
          />
        )}
      </div>
    </div>
  );
}

export default Detail;
