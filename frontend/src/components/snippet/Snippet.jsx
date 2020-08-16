import React, { useState, useEffect } from "react";
import "./snippet.sass";
//api
import { getSnippetFromID, getSnippetComments } from "../../helpers/api";
//components
//modules
import { useParams } from "react-router-dom";

function Snippet() {
  const [snippet, setSnippet] = useState({});
  const [comments, setComments] = useState([]);
  const [isLoadingSnippet, setIsLoadingSnippet] = useState(true);
  const [isLoadingComments, setIsLoadingComments] = useState(true);
  const [getError, setGetError] = useState(null);

  const [refresh, setRefresh] = useState(true);

  const params = useParams();

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

  return (
    <main className="snippet">
      <header></header>
      <section>
        <h3>{snippet.title}</h3>
        {comments.map((comment) => (
          <div key={comment.id}>
            {/* insert component here */}
            {comment.comment}
          </div>
        ))}
      </section>
    </main>
  );
}

export default Snippet;
