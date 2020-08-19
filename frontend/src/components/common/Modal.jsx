import React from "react";
import "./modal.sass";
import { useStateValue } from "../../helpers/stateProvider";
function Modal() {
  const [{ modal }, dispatch] = useStateValue();

  return (
    <main>
      {modal && (
        <div className="modal">
          <form>
            <h3>this is a form</h3>
            <h4>Another ele of the form</h4>
          </form>
          <button
            className="close-modal"
            onClick={() => {
              dispatch({ type: "TOGGLE_MODAL", modal: false });
            }}
          >
            close modal
          </button>
        </div>
      )}
    </main>
  );
}

export default Modal;
