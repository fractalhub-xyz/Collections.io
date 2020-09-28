import React from "react";
import "./modal.sass";
//components
import { useStateValue } from "../../helpers/stateProvider";

import EditCollection from "./editCollection";
import CreateCollection from "./createCollection.";
import CreateSnippet from "./createSnippet";
import { Close } from "@material-ui/icons";

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
    create_snippet: CreateSnippet,
  };

  const SelectedForm = map[form];

  return (
    <main>
      {modal && (
        <div>
          <div className="modal-blur" />
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
        </div>
      )}
    </main>
  );
}

export default Modal;
