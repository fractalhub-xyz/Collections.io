import React, { useState } from "react";
//api
import { postCollectionSettings } from "../../helpers/api";
//modules
import { useForm } from "react-hook-form";
import { useStateValue } from "../../helpers/stateProvider";
import { Public, Lock } from "@material-ui/icons";

function EditPermissions() {
  const [{ prefill_data, id }, dispatch] = useStateValue();
  const [permission, setPermission] = useState(prefill_data.permission);
  const [allowed_users, setAllowed_users] = useState(
    prefill_data.allowed_users
  );

  const [error, setError] = useState("");

  const editPermissionsHandle = async (e) => {
    e.preventDefault();
    var settingsPayload = {};
    if (permission === "selective") {
      settingsPayload = { permission, allowed_users };
    } else {
      settingsPayload = { permission };
    }
    try {
      await postCollectionSettings(id, settingsPayload);
      console.log("Successfully updated collection");
      dispatch({ type: "CLOSE_MODAL" });
      dispatch({
        type: "REFRESH",
        refresh: true,
      });
    } catch (error) {
      console.log("Failed to updated a collection");
      setError(error.response.data.detail);
    }
  };

  return (
    <form className="edit-permissions">
      <header />
      <section>
        <h1>Edit collection permssions</h1>
        <label>Permissions</label>
        <div className="selects">
          <div
            className={
              permission === "all" ? "select center current" : "select center"
            }
            onClick={() => {
              setPermission("all");
            }}
          >
            <Public />
            &nbsp; ALL
          </div>
          <div
            className={
              permission === "none" ? "select center current" : "select center"
            }
            onClick={() => {
              setPermission("none");
            }}
          >
            <Lock />
            &nbsp; NONE
          </div>
          <div
            className={
              permission === "selective"
                ? "select center current"
                : "select center"
            }
            onClick={() => {
              setPermission("selective");
            }}
          >
            <Lock />
            &nbsp; SELECTIVE
          </div>
        </div>
        {permission === "selective" && (
          <div>
            <label>ALLOWED USERS (as csv)</label>
            <input
              value={allowed_users}
              onChange={(e) => {
                setAllowed_users(e.target.value);
              }}
            />
          </div>
        )}
        {!!error.length && (
          <div className="api-error">
            {error}
            <span
              className="back"
              onClick={() => {
                dispatch({ type: "CLOSE_MODAL" });
              }}
            >
              &nbsp;[ go back ]
            </span>
          </div>
        )}

        <button onClick={editPermissionsHandle}>Submit</button>
      </section>
      <footer />
    </form>
  );
}

export default EditPermissions;
