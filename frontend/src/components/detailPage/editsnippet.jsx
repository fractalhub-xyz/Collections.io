import React, { useState } from "react";
//ICONS
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//API
import { postNewSnippet } from "../../helpers/api";

function EditSnippet({ setEditModal, setRefresh, snippet }) {
  //createSnippet
  const [title, setTitle] = useState(snippet.title);
  const [link, setLink] = useState(snippet.link);
  const [type, setType] = useState(snippet.type_of);

  //   const createSnippet = async (e) => {
  //     e.preventDefault();
  //     const payload = {
  //       title: title,
  //       type_of: type,
  //       link: link,
  //       collection: collectionID,
  //     };
  //     try {
  //       const { data } = await postNewSnippet(payload);
  //       //   addSnippetToCollection(data);
  //       console.log("Successfully pushed snippet to collection");
  //       setModalView(false);
  //       setRefresh(true);
  //     } catch {
  //       console.log("Failed to create a new collection");
  //       alert("Failed");
  //     }

  //     setTitle("");
  //     setLink("");
  //     setType("podcast");
  //   };

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
        <div className="buttonHolder">
          <button>EDIT</button>
        </div>
      </div>
    </div>
  );
}

export default EditSnippet;
