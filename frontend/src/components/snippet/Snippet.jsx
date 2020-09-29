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
import { useHistory, useParams } from "react-router-dom";
import {
  Create,
  Favorite,
  PlayArrow,
  Security,
  Settings,
  SettingsBackupRestore,
} from "@material-ui/icons";
import OtherSnippets from "./otherSnippets";
import { useStateValue } from "../../helpers/stateProvider";

function Snippet() {
  const [snippet, setSnippet] = useState({});
  const [snipID, setSnipID] = useState(null);
  const [comments, setComments] = useState([]);
  const [link, setLink] = useState("");
  const [totLikes, setTotLikes] = useState(0);
  const [isLoadingSnippet, setIsLoadingSnippet] = useState(true);
  const [isLoadingComments, setIsLoadingComments] = useState(true);
  const [getError, setGetError] = useState(null);
  const [collection, setCollection] = useState({});
  const [otherSnippets, setOtherSnippets] = useState([]);
  const [updateComments, setUpdateComments] = useState(false);
  const [newComment, setNewComment] = useState("");

  const [{ refresh }, dispatch] = useStateValue();
  const user = localStorage.getItem("user");

  //flags
  const [isLiked, setIsLiked] = useState(false);

  const params = useParams();

  // lifecycle functions

  useEffect(() => {
    setSnipID(params.id);
    dispatch({
      type: "REFRESH",
      refresh: true,
    });
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
    dispatch({
      type: "REFRESH",
      refresh: false,
    });
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
      if (snippet.type_of === "podcast") {
        code = code.split("/");
        setLink(`https://open.spotify.com/embed-podcast/${code[3]}/${code[4]}`);
      } else if (snippet.type_of === "video") {
        code = code.split("=");
        setLink(`https://www.youtube.com/embed/${code[1]}`);
      }
    }
  }, [snippet]);

  const [bg, setBg] = useState(
    "https://s3.amazonaws.com/assets.mlh.io/events/splashes/000/000/392/thumb/930adc5ed398-hackmtyMLH_300x300.png?1467906271"
  );

  const coll_bg = {
    background: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2)), url(${bg}) center / cover`,
    // background: `url(${bg}) center / cover`,
  };

  let history = useHistory();

  useEffect(() => {
    if (snippet.hearts) {
      setIsLiked(snippet.hearts.includes(user));
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
    <main className="snippet-view">
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
            <div
              className="owner"
              onClick={() => {
                history.push(`/user/${collection.owner}`);
              }}
            >
              {snippet.owner}
            </div>
            <div className="btns">
              {snippet.owner === user && (
                <div
                  className="ctrl-btn center"
                  onClick={() => {
                    dispatch({
                      type: "OPEN_FORM",
                      form: "edit_snippet",
                      id: { coll_id: collection.id, snip_id: snippet.id },
                      prefill_data: {
                        form_data: {
                          title: snippet.title,
                          link: snippet.link,
                        },
                        type: snippet.type_of,
                      },
                    });
                  }}
                >
                  <Create />
                </div>
              )}
              <div
                className="ctrl-btn center"
                onClick={() => {
                  history.push(`/collection/${collection.id}`);
                }}
              >
                <SettingsBackupRestore />
              </div>
            </div>
          </div>
        </div>
        {snippet.type_of === "podcast" && (
          <div className="player">
            <iframe
              src={link}
              width="100%"
              height="240"
              frameborder="0"
              allowtransparency="true"
              allow="encrypted-media"
            />{" "}
          </div>
        )}
        {snippet.type_of === "video" && (
          <div className="player dim video">
            <div className="icon center">Youtube</div>
            <div
              className="open center"
              onClick={() => {
                dispatch({
                  type: "OPEN_FORM",
                  form: "open_video",
                  id: link,
                });
              }}
            >
              <PlayArrow fontSize="large" />
            </div>
          </div>
        )}
        {snippet.type_of === "link" && (
          <div className="player dim link">
            <div className="icon center">Link</div>
            <div className="open center">
              <a
                data-text-color="#00fff0"
                data-tip={snippet.link}
                href={snippet.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <PlayArrow fontSize="large" />
              </a>
            </div>
          </div>
        )}
        {snippet.type_of === "article" && (
          <div className="player dim article">
            <div className="icon center">Article</div>
            <div className="open center">
              <a
                data-text-color="#00fff0"
                data-tip={snippet.link}
                href={snippet.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <PlayArrow fontSize="large" />
              </a>
            </div>
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
  );
}

export default Snippet;
