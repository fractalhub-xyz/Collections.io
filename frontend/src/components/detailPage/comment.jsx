import React, { useState, useEffect } from "react";
//API
import {
  DeleteComment,
  postUpvoteComment,
  putEditComment,
} from "../../helpers/api";
//modules
import { faThumbsUp, faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Comment({ comment, setUpdateComments, snipID }) {
  const [upvotes, setUpvotes] = useState(0);
  const [isupvoted, setIsupvoted] = useState(false);
  const [edit, setEdit] = useState(false);
  const [newComment, setNewComment] = useState(comment.comment);

  useEffect(() => {
    setUpvotes(comment.upvotes.length);
    setIsupvoted(comment.upvotes.includes(localStorage.getItem("user")));
  }, []);

  //functions
  const submitNewComment = async (e) => {
    e.preventDefault();
    const payload = {
      comment: newComment,
      snippet: snipID,
    };
    try {
      await putEditComment(comment.id, payload);
      console.log("Successfully edited comment");
    } catch (error) {
      console.log(error);
    }
    setEdit(false);
    setUpdateComments(true);
  };

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
      <div className="comment">
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
            <span>
              <FontAwesomeIcon
                onClick={() => {
                  Delete(comment.id);
                }}
                className="comment-icon pad-left"
                icon={faTrashAlt}
              />
              <FontAwesomeIcon
                onClick={() => {
                  setEdit(true);
                }}
                className="comment-icon pad-left"
                icon={faEdit}
              />
            </span>
          )}
        </div>
      </div>

      {edit && (
        <div>
          <h3>EDIT COMMENT</h3>
          <input
            value={newComment}
            onChange={(e) => {
              setNewComment(e.target.value);
            }}
          />&nbsp;
          <button onClick={submitNewComment}>SAVE</button>
        </div>
      )}
    </div>
  );
}

export default Comment;
