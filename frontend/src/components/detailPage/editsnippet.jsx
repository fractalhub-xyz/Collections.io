import React, { useState } from "react";
//ICONS
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//API
import { editSnippet, deleteSnippet } from "../../helpers/api";

function EditSnippet({ setEditModal, setRefresh, snippet, collectionName }) {
  //createSnippet
  const [title, setTitle] = useState(snippet.title);
  const [link, setLink] = useState(snippet.link);
  const [type, setType] = useState(snippet.type_of);
  const [error, setError] = useState("");

  const editSelected = async (e) => {
    e.preventDefault();
    const payload = {
      title: title,
      type_of: type,
      link: link,
      collection: snippet.collection,
    };
    try {
      await editSnippet(snippet.id, payload);
      console.log("Successfully editted snippet");
      setEditModal(false);
      setRefresh(true);
    } catch (error) {
      console.log(error);
      console.log("Failed to edit snippet");
      setError("Invalid Entry");
    }
  };

  const deleteSelected = async (e) => {
    e.preventDefault();
    try {
      await deleteSnippet(snippet.id);
      console.log("Successfully removed snippet from collection");
      setEditModal(false);
      setRefresh(true);
    } catch {
      console.log("Failed to remove snippet from collection");
      alert("Failed");
    }
  };

  return (
    <div className="modal">
      <div className="closeForm">
        <FontAwesomeIcon
          className="closeIcon sidenav-link"
          onClick={() => {
            setEditModal(false);
          }}
          icon={faTimes}
        />
      </div>
      <div className="form">
        <h4>EDIT SNIPPET</h4>
        <div className="formContainer">
          <div className="formCard">{collectionName}</div>
          <div className="formText">
            <h5>TITLE</h5>
            <input
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <h5>LINK</h5>
            <textarea
              value={link}
              onChange={(e) => {
                setLink(e.target.value);
              }}
            />
            <h5>TYPE</h5>
            <input
              value={type}
              onChange={(e) => {
                setType(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="errorText">{error}</div>
        <div className="buttonHolder">
          <button onClick={editSelected}>SAVE</button>
          <button onClick={deleteSelected}>DELETE</button>
        </div>
      </div>
    </div>
  );
}

export default EditSnippet;
