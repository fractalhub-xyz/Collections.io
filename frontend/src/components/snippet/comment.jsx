import React, { useState, useEffect } from "react";
import "./snippet.sass";
//icons
import { Check, Create, Delete, ThumbUp } from "@material-ui/icons";
//api
import {
  DeleteComment,
  postUpvoteComment,
  putEditComment,
} from "../../helpers/api";
import { getImg } from "../../helpers/utils";

function Comment({ comment, setUpdateComments }) {
  const [upvotes, setUpvotes] = useState(0);
  const [isupvoted, setIsupvoted] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [newComment, setNewComment] = useState(comment.comment);
  useEffect(() => {
    setUpvotes(comment.upvotes.length);
    setIsupvoted(comment.upvotes.includes(localStorage.getItem("user")));
  }, [comment.upvotes]);

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

  const submitNewComment = async (e) => {
    e.preventDefault();
    const payload = {
      comment: newComment,
      snippet: comment.snippet,
    };
    try {
      await putEditComment(comment.id, payload);
      console.log("Successfully edited comment");
    } catch (error) {
      console.log(error.response.data);
    }
    setUpdateComments(true);
    setIsEdit(false);
  };

  return (
    <div className="comment">
      <div className="top">
        <div className="left">
          <div className="icon">
            <img src={comment.avatar} alt="propic" />
          </div>
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
          {localStorage.getItem("user") === comment.owner && isEdit ? (
            <div>
              <div className="btn center" onClick={DeleteComm}>
                <Delete />
              </div>
              <div className="btn center" onClick={submitNewComment}>
                <Check />
              </div>
            </div>
          ) : (
            <div
              className="btn center"
              onClick={() => {
                setIsEdit(true);
              }}
              //also set focus to input field
            >
              <Create />
            </div>
          )}
        </div>
      </div>
      {!isEdit ? (
        <div className="content">{comment.comment}</div>
      ) : (
        <div className="edit-content">
          <input
            value={newComment}
            onChange={(e) => {
              setNewComment(e.target.value);
            }}
          />
        </div>
      )}
    </div>
  );
}

export default Comment;
