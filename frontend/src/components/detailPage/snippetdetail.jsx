import React, { useState, useEffect } from "react";
import "./detail.css";
import { useParams } from "react-router-dom";
import Navbar from "./navbar";
//API
import {
  getSnippetFromID,
  getCollectionFromID,
  postHeartSnippet,
} from "../../helpers/api";
// import { postFollowCollection } from "../../helpers/api";
//components
import EditSnippet from "./editsnippet";
import { useHistory } from "react-router-dom";
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
  let history = useHistory();
  //states
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [editModal, setEditModal] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [totLikes, setTotLikes] = useState(0);
  const [isPodcast, setIsPodcast] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [snippet, setSnippet] = useState({});
  const [otherSnippets, setOtherSnippets] = useState([]);
  const [collection, setCollection] = useState({});
  const [id, setID] = useState(null);
  const [snipID, setSnipID] = useState(null);
  const [podcast, setPodcast] = useState(null);
  //lifcycle funcs

  useEffect(() => {
    setID(params.id);
    setSnipID(params.snip);
    console.log(snipID, id);
    setRefresh(true);
  }, [params]);

  useEffect(() => {
    console.log("rendering Detail View");
    if (!refresh) {
      return;
    }
    async function fetchSnippet() {
      try {
        console.log(`fetching snippet ${snipID} from collectino ${id}`);
        const response = await getSnippetFromID(snipID);
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
  }, [refresh, id]);

  //lifcycle funcs
  useEffect(() => {
    if (snippet.collection) {
      async function fetchCollection() {
        try {
          const response = await getCollectionFromID(snippet.collection);
          setCollection(response.data);
          setOtherSnippets(response.data.snippets);
        } catch (error) {
          console.error(error);
        }
        setIsLoading(false);
      }
      fetchCollection();
    }
    var code = snippet.link;
    if (code) {
      code = code.split("/");
      setPodcast(
        `https://open.spotify.com/embed-podcast/${code[3]}/${code[4]}`
      );
      console.log("type->", code[3]);
      console.log("code->", code[4]);
    }
  }, [snippet]);

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
      <div className="main">
        <Navbar />
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
                Collection {collection.name}
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
            <h2>Other Snippets fron collection {collection.name}</h2>
            <div className="line" />
            <div className="other-snippet-container">
              {otherSnippets
                .filter((snip) => snip.title != snippet.title)
                .map((snippet) => (
                  <div
                    className="other-snippet-card"
                    onClick={() => {
                      history.push(
                        `/detail/${snippet.collection}/${snippet.id}`
                      );
                    }}
                  >
                    <h4>{snippet.title}</h4>- {snippet.owner}
                    {}
                  </div>
                ))}
            </div>
            <h2>Comment Section</h2>
            <div className="line" />
            {isPodcast && (
              <div>
                <iframe
                  src={podcast}
                  width="100%"
                  height="200"
                  frameborder="0"
                  allowtransparency="true"
                  allow="encrypted-media"
                ></iframe>
              </div>
            )}
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
