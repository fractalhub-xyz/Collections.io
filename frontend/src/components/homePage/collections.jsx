import React from "react";
import { useHistory } from "react-router-dom";

function Collections({ collections }) {
  let history = useHistory();
  const openCollection = (id) => {
    localStorage.setItem("collectionId", id);
    history.push("/detail");
  };
  return (
    <div>
      {collections.map((collection) => (
        <div key={collection.id} className="collection">
          <div
            onClick={() => {
              openCollection(collection.id);
            }}
            className="card"
          >
            {/* <img src={""} alt="TEMP"></img> */}
            <p>{collection.name}</p>
          </div>
          <p className="card-text">
            created by <span className="cyan">{collection.owner}</span>
          </p>
          <p className="card-text">2304 HEARTS</p>
        </div>
      ))}{" "}
    </div>
  );
}

export default Collections;
