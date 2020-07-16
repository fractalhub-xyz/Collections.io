import React, { useState } from "react";
//ICONS
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//API
import { postNewSnippet } from "../../helpers/api";

function NewSnippet({ setModalView, collectionID, setRefresh }) {
  //createSnippet
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [type, setType] = useState("podcast");
  const [error, setError] = useState("");

  const createSnippet = async (e) => {
    e.preventDefault();
    const payload = {
      title: title,
      type_of: type,
      link: link,
      collection: collectionID,
    };
    try {
      await postNewSnippet(payload);
      console.log("Successfully pushed snippet to collection");
      setModalView(false);
      setRefresh(true);
      setTitle("");
      setLink("");
      setType("podcast");
    } catch {
      console.log("Failed to create a new collection");
      setError("Invalid Entry");
    }
  };

  return (
    <div className="modal">
      <div className="closeForm">
        <FontAwesomeIcon
          className="closeIcon sidenav-link"
          onClick={() => {
            setModalView(false);
          }}
          icon={faTimes}
        />
      </div>
      <div className="form">
        <h4>ADD SNIPPET TO COLLECTION</h4>
        <div className="formContainer">
          <div className="formCard" />
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
          <button onClick={createSnippet}>ADD</button>
        </div>
      </div>
    </div>
  );
}

export default NewSnippet;
