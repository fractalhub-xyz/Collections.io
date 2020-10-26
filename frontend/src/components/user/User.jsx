import React, { useState, useEffect } from "react";
import "./user.sass";
//api
import { getUserFromID, postUserFollow } from "../../helpers/api";
//components
//modules
import { useHistory, useParams } from "react-router-dom";
import YourCollection from "./yourCollection";
import { useStateValue } from "../../helpers/stateProvider";
import { getImg } from "../../helpers/utils";

function User() {
  const params = useParams();
  const [userID, setUserID] = useState(params.username);
  const [user, setUser] = useState({});
  const [collections, setCollections] = useState([]);
  const [isFollowed, setIsFollowed] = useState(false);
  const [no_followers, setNo_followers] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [getError, setGetError] = useState(null);
  const [numSnippets, setNumSnippets] = useState(0);
  const [numCollection, setNumCollection] = useState(0);
  const [numCollectionFollows, setNumCollectionFollows] = useState(0);

  const [refresh, setRefresh] = useState(true);

  const [, dispatch] = useStateValue();
  let history = useHistory();

  useEffect(() => {
    setUserID(params.username);
    setRefresh(true);
  }, [params]);

  // lifecycle functions
  useEffect(() => {
    console.log("[RENDER] >> User");
    if (!refresh) {
      return;
    }
    async function fetchUser() {
      const user = localStorage.getItem("user");
      try {
        console.log(`[GET] >> User ${params.username} details`);
        const response = await getUserFromID(userID);
        setUser(response.data);
        setIsFollowed(response.data.profile.followers.includes(user));
        setNo_followers(response.data.profile.followers.length);
      } catch (error) {
        console.error(error);
        setGetError(`Failed to load data from user : ${params.username}`);
      }
      setIsLoading(false);
    }
    fetchUser();
    setRefresh(false);
  }, [refresh, params, userID]);

  const followUser = async (e) => {
    e.preventDefault();
    try {
      const response = await postUserFollow(user.username);
      console.log("follow/unfollow req sent");
      setIsFollowed(response.data.followed);
      if (isFollowed === false) {
        setNo_followers(no_followers - 1);
      } else {
        setNo_followers(no_followers + 1);
      }
    } catch {
      alert("Unable to process your request right now");
    }
  };

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

  console.log("USER", user);

  return (
    <main className="user">
      <div className="info">
        <div className="card">
          <div className="propic">
            <img src={getImg(user)} alt="propic" />
          </div>
          <div className="username">{user.username}</div>
          <div className="email">{user.email}</div>
          <div className="stats">
            <div className="stat"> {no_followers} Follower</div>
            {/* <div className="stat"> 1 Following</div> */}
            <div className="stat"> {numCollectionFollows} ★</div>
          </div>
          {user.username === localStorage.getItem("user") ? (
            <div>
              <button
                onClick={() => {
                  dispatch({
                    type: "OPEN_FORM",
                    form: "update_user",
                  });
                }}
              >
                Edit Profile
              </button>
              <button
                onClick={() => {
                  history.push("/");
                }}
              >
                Logout
              </button>
            </div>
          ) : (
            <button onClick={followUser}>
              {!isFollowed ? <p>Follow</p> : <p>Unfollow</p>}
            </button>
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
