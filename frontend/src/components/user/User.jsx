import React, { useState, useEffect } from "react";
import "./user.sass";
//api
import { getUserFromID } from "../../helpers/api";
//components
//modules
import { useParams } from "react-router-dom";
import YourCollection from "./yourCollection";

function User() {
  const [user, setUser] = useState({});
  const [collections, setCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [getError, setGetError] = useState(null);
  const [numSnippets, setNumSnippets] = useState(0);
  const [numCollection, setNumCollection] = useState(0);
  const [numCollectionFollows, setNumCollectionFollows] = useState(0);

  const [refresh, setRefresh] = useState(true);

  const params = useParams();

  // lifecycle functions
  useEffect(() => {
    console.log("[RENDER] >> User");
    if (!refresh) {
      return;
    }
    async function fetchUser() {
      try {
        console.log(`[GET] >> User ${params.username} details`);
        const response = await getUserFromID(params.username);
        setUser(response.data);
      } catch (error) {
        console.error(error);
        setGetError(`Failed to load data from user : ${params.username}`);
      }
      setIsLoading(false);
    }
    fetchUser();
    setRefresh(false);
  }, [refresh, params]);

  const refreshCount = () => {
    var colLen = collections.length;
    var Slen = 0;
    var Flen = 0;
    for (var i = 0; i < colLen; i++) {
      var snipLen = collections[i].snippets.length;
      var folLen = collections[i].followers.length;
      if (snipLen !== 0) {
        Slen = Slen + snipLen;
      }
      if (folLen !== 0) {
        Flen = Flen + snipLen;
      }
      setNumSnippets(Slen);
      setNumCollectionFollows(Flen);
    }
  };

  useEffect(() => {
    if (user.collections) {
      setCollections(user.collections);
    }
  }, [user]);

  useEffect(() => {
    refreshCount();
    setNumCollection(collections.length);
  }, [collections]);

  return (
    <main className="user">
      <div className="info">
        <div className="card">
          <div className="propic"></div>
          <div className="username">{user.username}</div>
          <div className="email">{user.email}</div>
          <div className="stats">
            <div className="stat"> 1 Follower</div>
            <div className="stat"> 1 Following</div>
            <div className="stat"> {numCollectionFollows} ★</div>
          </div>
          {user.username === localStorage.getItem("user") ? (
            <button>Edit Profile</button>
          ) : (
            <button>Follow</button>
          )}
        </div>
        <div className="counts">
          <div className="count c2 center">
            <div className="outline center">{numCollection} Collections</div>
          </div>
          <div className="count c4 center">
            <div className="outline center">{numSnippets} Snippets</div>
          </div>
        </div>
      </div>
      <div className="user-collections">
        <div className="header">{user.username}'s collections</div>
        <div className="user-container">
          {collections.map((collection) => (
            <YourCollection collection={collection} key={collection.id} />
          ))}
        </div>
      </div>
    </main>
  );
}

export default User;
