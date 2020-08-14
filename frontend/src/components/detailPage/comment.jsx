import React, { useState, useEffect } from "react";
//API
import { DeleteComment, postUpvoteComment } from "../../helpers/api";
//modules
import { faHeart, faThumbsUp, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Comment({ comment, setUpdateComments }) {
  const [upvotes, setUpvotes] = useState(0);
  const [isupvoted, setIsupvoted] = useState(false);

  useEffect(() => {
    setUpvotes(comment.upvotes.length);
    setIsupvoted(comment.upvotes.includes(localStorage.getItem("user")));
  }, []);

  //functions
  const Delete = async (id) => {
    try {
      await DeleteComment(id);
      console.log("Succesfully deleted comment");
    } catch (error) {
      console.log(error);
    }
    setUpdateComments(true);
  };

  const upvoteComment = async (e) => {
    e.preventDefault();
    try {
      const response = await postUpvoteComment(comment.id);
      if (response.data.success === true) {
        if (response.data.upvoted === false) {
          setUpvotes(upvotes - 1);
        } else {
          setUpvotes(upvotes + 1);
        }
      }
      setIsupvoted(response.data.upvoted);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        <h3>By {comment.owner}</h3>
      </div>
      <div>
        <p>{comment.comment}</p>
      </div>
      <div>
        <FontAwesomeIcon
          onClick={upvoteComment}
          className={isupvoted ? "comment-icon teal" : "comment-icon"}
          icon={faThumbsUp}
        />{" "}
        &nbsp; {upvotes} Upvotes
        {localStorage.getItem("user") === comment.owner && (
          <FontAwesomeIcon
            onClick={() => {
              Delete(comment.id);
            }}
            className="comment-icon pad-left"
            icon={faTrashAlt}
          />
        )}
      </div>
    </div>
  );
}

export default Comment;
