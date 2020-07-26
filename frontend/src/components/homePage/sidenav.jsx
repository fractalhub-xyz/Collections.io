import React, { useState, useEffect } from "react";
//ICONS
import {
  faHome,
  faFolderOpen,
  faPlusCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//MODULES
import { useHistory, Link } from "react-router-dom";
//API
import { postNewCollection, getFollowedCollections } from "../../helpers/api";

function SideNav({ setRefresh }) {
  let history = useHistory();
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [modalView, setModalView] = useState(false);
  const [error, setError] = useState("");
  const [followed, setFollowed] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const response = await getFollowedCollections();
        console.log(response);
        const followed = response.data;
        setFollowed(followed);
      } catch (error) {
        setError(error);
      }
    }

    getData();
  }, []);

  const createCollection = async (e) => {
    e.preventDefault();
    const payload = { name, desc };
    try {
      const response = await postNewCollection(payload);
      setModalView(false);
      history.push(`/detail/${response.data.id}`);
      setRefresh(true);
    } catch {
      console.log("Failed to create a new collection");
      setError("Invalid Entry");
    }
  };

  const redirectHome = () => {
    history.push("/home");
  };
  const rediretExplore = () => {
    history.push("/");
  };
  return (
    <div className="sidenav">
      <div className="sidenav-container">
        <div className="dotdotdot" onClick={() => {}}>
          ...
        </div>
        <div className="sidenav-link" onClick={redirectHome}>
          {" "}
          <FontAwesomeIcon icon={faHome} />
          &nbsp;HOME
        </div>
        <div className="sidenav-link" onClick={rediretExplore}>
          {" "}
          <FontAwesomeIcon icon={faFolderOpen} />
          &nbsp;EXLPORE - TEMP(LOGIN)
        </div>
        <div className="line" />
        <h4>YOUR COLLECTIONS</h4>
        <div className="followed-colls">
          {followed.map((coll) => (
            <Link to={`/detail/${coll.id}`}>{coll.name}</Link>
          ))}
        </div>
        <div className="line" />
        <div
          onClick={() => {
            setModalView(true);
          }}
          className="addCollection sidenav-link"
        >
          ADD COLLECTION&nbsp;
          <FontAwesomeIcon icon={faPlusCircle} />
        </div>
      </div>
      <div>
        {modalView && (
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
            <div className="form">
              <h4>CREATE NEW COLLECTION</h4>
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
                </div>
              </div>
              <div className="errorText">{error}</div>
              <div className="buttonHolder">
                <button onClick={createCollection}>CREATE</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SideNav;
