import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

//components
import SideNav from "../homePage/sidenav";
import Navbar from "../detailPage/navbar";

//API
import { getUserFromID } from "../../helpers/api";
function User() {
  // params
  const params = useParams();
  //states
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [refresh, setRefresh] = useState(true);
  const [userCollectinos, setUserCollectinos] = useState([]);

  //lifcycle funcs
  useEffect(() => {
    console.log("rendering User View");
    if (!refresh) {
      return;
    }

    async function fetchUserInfo() {
      try {
        const id = params.id;
        console.log(`fetching user ${id} details`);
        const response = await getUserFromID(id);
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
  return (
    <div className="root">
      <SideNav setRefresh={setRefresh} />
      <div className="main">
        <Navbar />
        {error ? (
          <div className="loading-error">{error}</div>
        ) : (
          <div className="container">
            <div>{user.username}</div>
            <div>{user.email}</div>
            <ul>
              {userCollectinos.map((collection) => (
                <li>{collection.name} -- Number of snippets {collection.snippets.length}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default User;
