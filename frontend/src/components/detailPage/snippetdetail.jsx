import React, { useState, useEffect } from "react";
import "./detail.css";
import SideNav from "../homePage/sidenav";
import { useParams } from "react-router-dom";
import Navbar from "./navbar";
//API
import { getSnippetFromID, postHeartSnippet } from "../../helpers/api";
// import { postFollowCollection } from "../../helpers/api";
//components
import EditSnippet from "./editsnippet";
//modules
import ReactTooltip from "react-tooltip";

//ICONS
import {
  faHeart,
  faNewspaper,
  faPodcast,
  faUserEdit,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SnippetDetail() {
  // params
  const params = useParams();
  //states
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [editModal, setEditModal] = useState(false);
  const [refresh, setRefresh] = useState(true);
  const [isOwner, setIsOwner] = useState(false);
  const [totLikes, setTotLikes] = useState(0);
  const [isPodcast, setIsPodcast] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [snippet, setSnippet] = useState({});
  //lifcycle funcs

  useEffect(() => {
    console.log("rendering Detail View");
    if (!refresh) {
      return;
    }
    async function fetchSnippet() {
      try {
        const id = params.id;
        const snip = params.snip;
        console.log(`fetching snippet ${snip} from collectino ${id}`);
        const response = await getSnippetFromID(snip);
        setSnippet(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
        setError(`Failed to load collection with ID: ${params.id}`);
      }
      setIsLoading(false);
    }
    fetchSnippet();
    setRefresh(false);
  }, [refresh]);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user === snippet.owner) {
      setIsOwner(true);
    } else {
      setIsOwner(false);
    }
    if (snippet.type_of === "podcast") {
      setIsPodcast(true);
    } else {
      setIsPodcast(false);
    }
    if (snippet.hearts) {
      setIsLiked(snippet.hearts.includes(user));
      setTotLikes(snippet.hearts.length);
    }
  }, [snippet]);

  //functions
  const heartSnippet = async (e) => {
    e.preventDefault();
    try {
      const response = await postHeartSnippet(snippet.id);
      if (response.data.success === true) {
        if (response.data.liked === false) {
          setTotLikes(totLikes - 1);
        } else {
          setTotLikes(totLikes + 1);
        }
      }
      setIsLiked(response.data.liked);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="root">
      <SideNav setRefresh={setRefresh} />
      <div className="main">
        <Navbar/>
        {error ? (
          <div className="loading-error">{error}</div>
        ) : (
          <div className="container">
            {isLoading && <h4>Loading..</h4>}
            <div className="snippetContainer">
              <div className={isPodcast ? "snippetCard bgTeal" : "snippetCard"}>
                {!isPodcast ? (
                  <FontAwesomeIcon className="typeIcon" icon={faNewspaper} />
                ) : (
                  <FontAwesomeIcon className="typeIcon" icon={faPodcast} />
                )}
              </div>
              <div className="searchText">
                <span className="searchTitle">{snippet.title}</span>
                <br />
                Created by <span className="teal">{snippet.owner}</span> on{" "}
                {snippet.timestamp}
                <br />
                Link: &nbsp;
                <a
                  href={snippet.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link"
                >
                  {snippet.link}
                </a>
                <br />
                Collection {snippet.collection}
                <br />
                {snippet.type_of}
                <br />
                {totLikes}{" "}
                <FontAwesomeIcon
                  onClick={heartSnippet}
                  className={isLiked ? "liked teal" : "liked"}
                  icon={faHeart}
                />
              </div>
              <div className="snippetSettings">
                {isOwner && (
                  <FontAwesomeIcon
                    onClick={() => {
                      setEditModal(true);
                    }}
                    data-tip="Edit Snippet"
                    className="deleteIcon"
                    icon={faUserEdit}
                  />
                )}
              </div>
            </div>
            <div>- Other Similar Snippets</div>
            <div>- Comment Section</div>
          </div>
        )}
      </div>
      <div>
        {editModal && (
          <EditSnippet
            setEditModal={setEditModal}
            setRefresh={setRefresh}
            snippet={snippet}
            collectionName={snippet.collection}
            redirect={true}
          />
        )}
      </div>
      <ReactTooltip />
    </div>
  );
}

export default SnippetDetail;
