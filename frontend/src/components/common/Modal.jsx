import React, { useEffect, useRef } from "react";
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
  const formEl = useRef(null);

  const map = {
    create_collection: CreateCollection,
    edit_collection: EditCollection,
    edit_permissions: EditPermissions,
    create_snippet: CreateSnippet,
    edit_snippet: EditSnippet,
    open_video: OpenVideo,
  };

  const closeModal = (e) => {
    dispatch({ type: "CLOSE_MODAL" });
  };

  const onClickOutside = (e) => {
    e.preventDefault();
    const userclicked = e.target;

    if (formEl.current && !formEl.current.contains(userclicked)) {
      closeModal();
    }
  };

  const onEscapeclick = (e) => {
    console.log(e.key, modal);
    if (formEl.current && e.key === "Escape") {
      closeModal();
    }
  };

  useEffect(() => {
    document.body.addEventListener("click", onClickOutside);
    document.body.addEventListener("keydown", onEscapeclick);

    return () => {
      document.body.removeEventListener("keydown", onEscapeclick);
      document.body.removeEventListener("click", onClickOutside);
    };
  }, []);

  const SelectedForm = map[form];

  const modalEl = (
    <div className="modal">
      <div ref={formEl}>
        {SelectedForm ? <SelectedForm /> : "Error finding your form"}
      </div>
      <div className="close-modal" onClick={closeModal}>
        <Close fontSize="medium" />
      </div>
    </div>
  );

  const container = document.getElementById("modal_container");

  return <main>{modal && ReactDOM.createPortal(modalEl, container)}</main>;
}

export default Modal;
