import React from "react";
import "./modal.sass";
//components
import { useStateValue } from "../../helpers/stateProvider";

import EditCollection from "./editCollection";
import CreateCollection from "./createCollection.";

function Modal() {
  const [{ modal, form }, dispatch] = useStateValue();

  function CreateColl() {
    return <CreateCollection />;
  }
  function EditColl() {
    return <EditCollection />;
  }

  const map = {
    create_collection: CreateColl,
    edit_collection: EditColl,
  };

  const SelectedForm = map[form];

  console.log("HELLOOOOOOO", modal);

  return (
    <main>
      {modal && (
        <div className="modal">
          {SelectedForm ? <SelectedForm /> : "Error finding your form"}
          <button
            className="close-modal"
            onClick={() => {
              dispatch({ type: "CLOSE_MODAL", modal: false, form: null });
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
