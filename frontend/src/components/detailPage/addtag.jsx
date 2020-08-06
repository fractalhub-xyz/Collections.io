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
    const payload = { tags: tags.map((tag) => tag.name) };
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
    if (!!newTag.length && !tags.map((tag) => tag.name).includes(newTag)) {
      setTags(tags.concat({ name: newTag, image_urls: [] }));
    }
    setNewTag("");
  }

  function handleKeyDown(e) {
    if ((e.metaKey || e.ctrlKey) && e.which) {
      addTag(e);
      return;
    }

    if (e.which == 13) {
      arrayAdd();
      return;
    }
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
                {!tags.length && <span>Start adding tags</span>}
                {tags.map((tag) => (
                  <span key={tag.name} className="tag">
                    {tag.name} &nbsp;{" "}
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
                onKeyDown={handleKeyDown}
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
