import React from "react";
import { createPortal } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

function Modal({ children, setModalView }) {
  const modal = (
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
      <div>{children}</div>
    </div>
  );

  return createPortal(modal, document.body);
}

export default Modal;
