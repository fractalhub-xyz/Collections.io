import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

//components
import Navbar from "../detailPage/navbar";
import Carousel from "../homePage/carousel";
import Collections from "../homePage/collections";
//API
import { getUserFromID } from "../../helpers/api";
//CSS
import "./user.css";

function User() {
  // params
  const params = useParams();
  //states
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [refresh, setRefresh] = useState(true);
  const [userCollectinos, setUserCollectinos] = useState([]);
  const [numSnippets, setNumSnippets] = useState(0);

  //lifcycle funcs
  useEffect(() => {
    console.log("rendering User View");
    if (!refresh) {
      return;
    }

    async function fetchUserInfo() {
      try {
        const username = params.username;
        console.log(`fetching user ${username} details`);
        const response = await getUserFromID(username);
        setUser(response.data);
        setUserCollectinos(response.data.collections);
      } catch (error) {
        console.error(error);
        setError(`Failed to load user with ID: ${params.id}`);
      }
      setIsLoading(false);
    }
    fetchUserInfo();
    setRefresh(false);
  }, [refresh]);

  const refreshCount = () => {
    var colLen = userCollectinos.length;
    var len = 0;
    for (var i = 0; i < colLen; i++) {
      var snipLen = userCollectinos[i].snippets.length;
      if (snipLen !== 0) {
        len = len + snipLen;
      }
      setNumSnippets(len);
    }
  };

  useEffect(() => {
    refreshCount();
  }, [userCollectinos]);

  return (
    <div className="root">
      <div className="main">
        <Navbar />

        <div className="container">
          {error && <h4>{error}</h4>}
          <h1 className="username">{user.username}</h1>
          <div className="stats-container">
            <div className="stat">
              <h1>-</h1>
              <span>Followers</span>
            </div>
            <div className="stat">
              <h1>{userCollectinos.length}</h1>
              <span>Collections</span>
            </div>
            <div className="stat">
              <h1>{numSnippets}</h1>
              <span>Snippets</span>
            </div>
          </div>

          {isLoading && <h4>Loading..</h4>}
          <Carousel title="Your Collections">
            {userCollectinos.map((collection) => (
              <Collections key={collection.id} collection={collection} />
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
}

export default User;
