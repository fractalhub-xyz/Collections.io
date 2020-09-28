import React, { useState, useEffect } from "react";
import "./snippet.sass";
//icons
import { Delete, ThumbUp } from "@material-ui/icons";
//api
import { DeleteComment, postUpvoteComment } from "../../helpers/api";

function Comment({ comment, setUpdateComments }) {

  const [upvotes, setUpvotes] = useState(0);
  const [isupvoted, setIsupvoted] = useState(false);
  useEffect(() => {
    setUpvotes(comment.upvotes.length);
    setIsupvoted(comment.upvotes.includes(localStorage.getItem('user')));
  }, []);

  const DeleteComm = async (e) => {
    e.preventDefault();
    try {
      await DeleteComment(comment.id);
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
    <div className="comment">
      <div className="top">
        <div className="left">
          <div className="icon" />
          <div className="by">{comment.owner}</div>
        </div>
        <div className="right">
          <div className="count">{upvotes}</div>
          <div
            className={isupvoted ? "btn center active" : "btn center"}
            onClick={upvoteComment}
          >
            <ThumbUp />
          </div>
          {localStorage.getItem('user') === comment.owner && (
            <div className="btn center" onClick={DeleteComm}>
              <Delete />
            </div>
          )}
        </div>
      </div>
      <div className="content">{comment.comment}</div>
    </div>
  );
}

export default Comment;
