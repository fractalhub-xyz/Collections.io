import React from "react";
import ReactDOM from "react-dom";

import "./modal.sass";
//components
import { useStateValue } from "../../helpers/stateProvider";

import EditCollection from "./editCollection";
import CreateCollection from "./createCollection.";
import CreateSnippet from "./createSnippet";
import { Close } from "@material-ui/icons";
import OpenVideo from "./openVideo";
import EditSnippet from "./editSnippet";
import EditPermissions from "./editPermissions";

function Modal() {
  const [{ modal, form }, dispatch] = useStateValue();

  const map = {
    create_collection: CreateCollection,
    edit_collection: EditCollection,
    edit_permissions: EditPermissions,
    create_snippet: CreateSnippet,
    edit_snippet: EditSnippet,
    open_video: OpenVideo,
  };

  const SelectedForm = map[form];

  const modalEl = (
    <div className="modal">
      {SelectedForm ? <SelectedForm /> : "Error finding your form"}
      <div
        className="close-modal"
        onClick={() => {
          dispatch({ type: "CLOSE_MODAL" });
        }}
      >
        <Close fontSize="medium" />
      </div>
    </div>
  );

  const container = document.getElementById("modal_container");

  return <main>{modal && ReactDOM.createPortal(modalEl, container)}</main>;
}

export default Modal;
