import React, { useState } from "react";
//ICONS
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//MODULES
import { useHistory } from "react-router-dom";
//API
import {
  editCollection,
  deleteCollection,
  postCollectionSettings,
} from "../../helpers/api";

function EditCollection({ setEditCollectionModal, setRefresh, collection }) {
  let history = useHistory();
  const [name, setName] = useState(collection.name);
  const [desc, setDesc] = useState(collection.desc);
  const [visibility, setVisibility] = useState(collection.visibility);
  const [permission, setPermission] = useState(collection.permission);
  const [allowed_users, setAllowed_users] = useState(collection.allowed_users);
  const [error, setError] = useState("");

  const editSelection = async (e) => {
    e.preventDefault();
    try {
      var payload = { name, desc, visibility };
      await editCollection(collection.id, payload);
      var settingsPayload = {}
      if (permission === "selective") {
        settingsPayload = { permission, allowed_users };
      } else {
        settingsPayload = { permission };
      }
      await postCollectionSettings(collection.id, settingsPayload);
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
            <div className="formCard">{collection.name}</div>
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
                maxlength="200"
                value={desc}
                onChange={(e) => {
                  setDesc(e.target.value);
                }}
              />
              <h5>Visibility</h5>
              <select
                value={visibility}
                onChange={(e) => {
                  setVisibility(e.target.value);
                }}
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
              <h5>Permissions</h5>
              <select
                value={permission}
                onChange={(e) => {
                  setPermission(e.target.value);
                }}
              >
                <option value="all">All users allowed to editc</option>
                <option value="none">No one allowed to edit</option>
                <option value="selective">
                  Selective users allowed to edit
                </option>
              </select>
              {permission === "selective" && (
                <div>
                  <h5>Enter users as a csv</h5>
                  <input
                    value={allowed_users}
                    onChange={(e) => {
                      setAllowed_users(e.target.value);
                    }}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="errorText">{error}</div>
          <div className="buttonHolder">
            <button onClick={editSelection}>SAVE</button>
            <button onClick={deleteSelection}>DELETE</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditCollection;
