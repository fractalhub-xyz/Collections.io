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
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

//ICONS
import {
  faHeart,
  faNewspaper,
  faPodcast,
  faCog,
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
  const [totLikes, setTotLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [snippet, setSnippet] = useState({});
  const [otherSnippets, setOtherSnippets] = useState([]);
  const [collection, setCollection] = useState({});
  const [id, setID] = useState(null);
  const [snipID, setSnipID] = useState(null);
  const [podcast, setPodcast] = useState(null);
  const [bg, setBg] = useState(
    "https://s3.amazonaws.com/assets.mlh.io/events/splashes/000/000/392/thumb/930adc5ed398-hackmtyMLH_300x300.png?1467906271"
  );
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
    if (snippet.hearts) {
      setIsLiked(snippet.hearts.includes(localStorage.getItem("user")));
      setTotLikes(snippet.hearts.length);
    }
  }, [snippet]);

  useEffect(() => {
    if (collection.tags) {
      if (collection.tags[0]) {
        setBg(collection.tags[0].image_urls);
      }
    }
  }, [collection]);

  //utitlity funcs
  const mystyle = {
    background: `url(${bg}) center / cover`,
  };

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
        ) : isLoading ? (
          <div className="loader">
            <Loader
              type="Grid"
              color="#00BFFF"
              height={50}
              width={50}
              timeout={3000} //3 secs
            />
          </div>
        ) : (
          <div className="container">
            {isLoading && <h4>Loading..</h4>}
            <div className="snippetContainer">
              <div className="snippetCard" style={mystyle}>
                {!(snippet.type_of === "podcast") ? (
                  <FontAwesomeIcon className="typeIcon" icon={faNewspaper} />
                ) : (
                  <FontAwesomeIcon className="typeIcon" icon={faPodcast} />
                )}
              </div>
              <div className="snippetText">
                <span className="snippetType">
                  {snippet.type_of} &nbsp; &nbsp;
                </span>
                <div className="snippetTitle">{snippet.title} &nbsp; </div>
                Created by {snippet.owner} on {snippet.timestamp}
                <div>{collection.name}</div>
                <div className="snippetTools">
                  <button
                    onClick={() => {
                      history.push(`${snippet.link}/`);
                    }}
                  >
                    OPEN
                  </button>
                  <FontAwesomeIcon
                    onClick={heartSnippet}
                    className={isLiked ? "liked teal" : "liked"}
                    icon={faHeart}
                  />
                  <span className="likedText">{totLikes} HEARTS </span>
                  {localStorage.getItem("user") === snippet.owner && (
                    <span>
                      <FontAwesomeIcon
                        onClick={() => {
                          setEditModal(true);
                        }}
                        data-tip="Edit Snippet"
                        icon={faCog}
                        className="liked"
                      />
                    </span>
                  )}
                </div>
              </div>
            </div>
            {snippet.type_of === "podcast" && (
              <div className="player">
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
            <h2>Other snippets you might like</h2>
            <div className="line" />
            <div className="ot-snippet-container">
              {otherSnippets
                .filter((snip) => snip.title != snippet.title)
                .map((snippet) => (
                  <div
                    className="ot-snippet"
                    onClick={() => {
                      history.push(
                        `/detail/${snippet.collection}/${snippet.id}`
                      );
                    }}
                  >
                    <div className="ot-snip-card" style={mystyle}>
                      {!(snippet.type_of === "podcast") ? (
                        <FontAwesomeIcon
                          className="typeIcon"
                          icon={faNewspaper}
                        />
                      ) : (
                        <FontAwesomeIcon
                          className="typeIcon"
                          icon={faPodcast}
                        />
                      )}
                    </div>
                    <div className="ot-snip-text">
                      <div>{snippet.title}</div>
                      <div>Added on {snippet.timestamp}</div>
                      <div>{snippet.hearts.length} HEARTS</div>
                    </div>
                  </div>
                ))}
            </div>

            {/* </div> */}
            <h2>Comment Section</h2>
            <div className="line" />
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
