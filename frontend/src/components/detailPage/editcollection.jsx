import React, { useState } from "react";
//ICONS
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//MODULES
import { useHistory } from "react-router-dom";
//API
import { editCollection, deleteCollection } from "../../helpers/api";

function EditCollection({ setEditCollectionModal, setRefresh, collection }) {
  let history = useHistory();
  const [name, setName] = useState(collection.name);
  const [desc, setDesc] = useState(collection.desc);
  const [error, setError] = useState("");

  const editSelection = async (e) => {
    e.preventDefault();
    const payload = { name, desc };
    try {
      await editCollection(collection.id, payload);
      setEditCollectionModal(false);
      setRefresh(true);
      console.log("Succesfull edited Collection");
    } catch (error) {
      console.log(error);
      console.log("Failed to edit");
      setError("Invalid Entry");
    }
  };
  const deleteSelection = async (e) => {
    e.preventDefault();
    try {
      await deleteCollection(collection.id);
      history.push("/home");
      console.log("Succesfull deleted Collection");
    } catch {
      console.log("Failed to delete");
      alert("Failed");
    }
  };
  return (
    <div>
      <div className="modal">
        <div className="closeForm">
          <FontAwesomeIcon
            className="closeIcon sidenav-link"
            onClick={() => {
              setEditCollectionModal(false);
            }}
            icon={faTimes}
          />
        </div>
        <div className="form">
          <h4>
            EDIT <span className="teal">{collection.name}</span>
          </h4>
          <div className="formContainer">
            <div className="formCard" />
            <div className="formText">
              <h5>Name</h5>
              <input
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <h5>Description</h5>
              <textarea
                value={desc}
                onChange={(e) => {
                  setDesc(e.target.value);
                }}
              />
              <h5>Tag</h5>
              <input />
            </div>
          </div>
          <div className="errorText">{error}</div>
          <div className="buttonHolder">
            <button onClick={editSelection}>EDIT</button>
            <button onClick={deleteSelection}>DELETE</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditCollection;
