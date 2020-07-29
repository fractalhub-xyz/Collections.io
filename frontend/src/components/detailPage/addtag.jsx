import React, { useState } from "react";
//ICONS
import { faTimes, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//API
import { postTagsToCollection } from "../../helpers/api";
//Modules

function AddTag({ setTagsModal, collection, setRefresh }) {
  //createSnippet
  const [error, setError] = useState("");
  const [tags, setTags] = useState(collection.tags);
  const [newTag, setNewTag] = useState("");

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

  function arrayRemove(arr, value) {
    return arr.filter(function (geeks) {
      return geeks != value;
    });
  }

  function arrayAdd() {
    setTags(tags.concat(newTag));
    setNewTag("");
  }

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
            <div>
              <div className="tags-list">
                {tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag} &nbsp;{" "}
                    <FontAwesomeIcon
                      className="del-tag"
                      icon={faTimes}
                      onClick={() => {
                        setTags(arrayRemove(tags, tag));
                      }}
                    />
                  </span>
                ))}
              </div>

              <input
                value={newTag}
                onChange={(e) => {
                  setNewTag(e.target.value);
                }}
                placeholder="#newtag"
              />
              <span>
                <FontAwesomeIcon
                  className="add-tag"
                  icon={faPlusCircle}
                  onClick={arrayAdd}
                />
              </span>
            </div>
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
