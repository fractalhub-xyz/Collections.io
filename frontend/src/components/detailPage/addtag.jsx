import React, { useState } from "react";
//ICONS
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//API
import { postTagsToCollection } from "../../helpers/api";
//Modules

function AddTag({ setTagsModal, collection, setRefresh }) {
  //createSnippet
  const [error, setError] = useState("");
  const [tags, setTags] = useState(collection.tags);

  const addTag = async (e) => {
    e.preventDefault();
    const payload = { tags };
    try {
      await postTagsToCollection(collection.id, payload);
      setTagsModal(false);
      setRefresh(true);
      console.log("Succesfull edited Collection");
    } catch (error) {
      console.log(error);
      setError("Failed to Add Tag");
    }
  };

  return (
    <div className="modal">
      <div className="closeForm">
        <FontAwesomeIcon
          className="closeIcon sidenav-link"
          onClick={() => {
            setTagsModal(false);
          }}
          icon={faTimes}
        />
      </div>
      <div className="form">
        <h4>ADD TAGS</h4>
        <div className="formContainer">
          <div className="formText tags">
            <input
              value={tags}
              onChange={(e) => {
                setTags(e.target.value);
              }}
            />
            {/* <h5>TITLE</h5>

            <h5>LINK</h5>
            <textarea
              value={link}
              onChange={(e) => {
                setLink(e.target.value);
              }}
            />
            <h5>TYPE</h5>
            <select
              value={type}
              onChange={(e) => {
                setType(e.target.value);
              }}
            >
              <option value="podcast">Podcast</option>
              <option value="article">Article</option>
            </select> */}
          </div>
        </div>
        <div className="errorText">{error}</div>
        <div className="buttonHolder">
          <button onClick={addTag}>SAVE</button>
        </div>
      </div>
    </div>
  );
}

export default AddTag;
