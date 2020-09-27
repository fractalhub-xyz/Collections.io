import React, { useState, useEffect } from "react";
import "./snippet.sass";
//api
import {
  getSnippetFromID,
  getSnippetComments,
  getCollectionFromID,
  postNewComment,
  postHeartSnippet,
} from "../../helpers/api";
import { getRelativeTime } from "../../helpers/time";
//components
import Comment from "./comment";
//modules
import { useParams } from "react-router-dom";
import { useStateValue } from "../../helpers/stateProvider";
import { Favorite, MoreVert, PlayArrow } from "@material-ui/icons";
import OtherSnippets from "./otherSnippets";

function Snippet() {
  const [snippet, setSnippet] = useState({});
  const [snipID, setSnipID] = useState(null);
  const [comments, setComments] = useState([]);
  const [podcast, setPodcast] = useState("");
  const [totLikes, setTotLikes] = useState(0);
  const [isLoadingSnippet, setIsLoadingSnippet] = useState(true);
  const [isLoadingComments, setIsLoadingComments] = useState(true);
  const [getError, setGetError] = useState(null);
  const [collection, setCollection] = useState({});
  const [otherSnippets, setOtherSnippets] = useState([]);
  const [updateComments, setUpdateComments] = useState(false);
  const [newComment, setNewComment] = useState("");

  //flags
  const [isLiked, setIsLiked] = useState(false);
  const [refresh, setRefresh] = useState(true);

  const params = useParams();

  //global states
  const [{ user, isDesktop }, dispatch] = useStateValue();

  // lifecycle functions

  useEffect(() => {
    setSnipID(params.id);
    setRefresh(true);
  }, [params]);

  useEffect(() => {
    console.log("[RENDER] >> Snippet");
    if (!refresh) {
      return;
    }
    async function fetchSnippet() {
      try {
        console.log(`[GET] >> Snippet ${params.id} details`);
        const response = await getSnippetFromID(params.id);
        setSnippet(response.data);
      } catch (error) {
        console.error(error);
        setGetError(`Failed to load snippet with ID: ${params.id}`);
      }
    }
    async function fetchComments() {
      try {
        console.log(`[GET] >> Comments for Snippet ${params.id}`);
        const response = await getSnippetComments(params.id);
        setComments(response.data);
      } catch (error) {
        console.error(error);
        setGetError(
          `Failed to load comments for snippet with ID: ${params.id}`
        );
        setIsLoadingComments(false);
      }
    }
    fetchSnippet();
    fetchComments();
    setRefresh(false);
  }, [refresh, snipID]);

  useEffect(() => {
    console.log("[RENDER] >> Updating Comments");
    async function fetchComments() {
      try {
        console.log(`[GET] >> Comments for Snippet ${params.id}`);
        const response = await getSnippetComments(params.id);
        setComments(response.data);
      } catch (error) {
        console.error(error);
        setGetError(
          `Failed to load comments for snippet with ID: ${params.id}`
        );
        setIsLoadingComments(false);
      }
    }
    setUpdateComments(false);
    fetchComments();
  }, [updateComments, snippet]);

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
        setIsLoadingSnippet(false);
      }
      fetchCollection();
    }
    var code = snippet.link;
    if (code) {
      code = code.split("/");
      setPodcast(
        `https://open.spotify.com/embed-podcast/${code[3]}/${code[4]}`
      );
    }
  }, [snippet]);

  const [bg, setBg] = useState(
    "https://s3.amazonaws.com/assets.mlh.io/events/splashes/000/000/392/thumb/930adc5ed398-hackmtyMLH_300x300.png?1467906271"
  );

  const coll_bg = {
    background: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2)), url(${bg}) center / cover`,
    // background: `url(${bg}) center / cover`,
  };

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
  
  //functions
  const submitNewComment = async (e) => {
    e.preventDefault();
    const payload = {
      comment: newComment,
      snippet: snipID,
    };
    try {
      await postNewComment(payload);
      console.log("Successfully submited new comment");
    } catch (error) {
      console.log(error);
    }
    setNewComment(" ");
    setUpdateComments(true);
  };

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
    <div>
      {isDesktop ? (
        <main className="snippet">
          <header>
            <div className="bigbox">
              <div className="card" style={coll_bg}></div>
              <div className="info">
                <div className="type">{snippet.type_of}</div>
                <div className="name">{snippet.title}</div>
                <div className="date">Created {snippet.timestamp}</div>
                <div className="likes">
                  <div
                    className={isLiked ? "btn center liked" : "btn center"}
                    onClick={heartSnippet}
                  >
                    <Favorite />
                  </div>
                  {totLikes} Likes
                </div>
              </div>
              <div className="col3">
                <div className="owner">{snippet.owner}</div>
                <MoreVert className="more" />
              </div>
            </div>
            {snippet.type_of === "podcast" && (
              <div className="player">
                <iframe
                  src={podcast}
                  width="100%"
                  height="240"
                  frameborder="0"
                  allowtransparency="true"
                  allow="encrypted-media"
                />{" "}
              </div>
            )}
          </header>
          <section>
            <div className="comments">
              <h1>{comments.length} COMMENTS</h1>
              <div className="new-comment">
                <input
                  placeholder="Say something interesting"
                  value={newComment}
                  onChange={(e) => {
                    setNewComment(e.target.value);
                  }}
                />
                <div className="btn center" onClick={submitNewComment}>
                  <PlayArrow />
                </div>
              </div>
              <div className="all">
                {comments.map((comment) => (
                  <Comment
                    key={comment.id}
                    comment={comment}
                    setUpdateComments={setUpdateComments}
                  />
                ))}
              </div>
            </div>
            <div className="otsnippets">
              {otherSnippets.map((snip) => (
                <OtherSnippets key={snip.id} snip={snip} />
              ))}
            </div>
          </section>
        </main>
      ) : (
        <main className="snippet">
          <header></header>
          <section></section>
        </main>
      )}
    </div>
  );
}

export default Snippet;
