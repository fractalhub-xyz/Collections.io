import React, { useState, useEffect } from "react";
import "./snippet.sass";
//api
import {
  getSnippetFromID,
  getSnippetComments,
  getCollectionFromID,
} from "../../helpers/api";
import { getRelativeTime } from "../../helpers/time";
//components
//modules
import { useParams } from "react-router-dom";
import { useStateValue } from "../../helpers/stateProvider";
import { Favorite, MoreVert } from "@material-ui/icons";

function Snippet() {
  const [snippet, setSnippet] = useState({});
  const [comments, setComments] = useState([]);
  const [podcast, setPodcast] = useState("");
  const [isLoadingSnippet, setIsLoadingSnippet] = useState(true);
  const [isLoadingComments, setIsLoadingComments] = useState(true);
  const [getError, setGetError] = useState(null);
  const [collection, setCollection] = useState({});
  const [otherSnippets, setOtherSnippets] = useState([]);

  //flags
  const [isLiked, setIsLiked] = useState(false);
  const [refresh, setRefresh] = useState(true);

  const params = useParams();

  //global states
  const [{ user, isDesktop }, dispatch] = useStateValue();

  // lifecycle functions
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
      setIsLoadingSnippet(false);
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
  }, [refresh, params]);

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
      console.log("type->", code[3]);
      console.log("code->", code[4]);
    }
  }, [snippet]);

  const [bg, setBg] = useState(
    "https://s3.amazonaws.com/assets.mlh.io/events/splashes/000/000/392/thumb/930adc5ed398-hackmtyMLH_300x300.png?1467906271"
  );

  const coll_bg = {
    background: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2)), url(${bg}) center / cover`,
    // background: `url(${bg}) center / cover`,
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
                <div className={isLiked ? "btn center liked" : "btn center"}>
                  <Favorite />
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
            </div>
            <div className="otsnippets"></div>
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
