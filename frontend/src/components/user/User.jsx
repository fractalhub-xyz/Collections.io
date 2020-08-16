import React, { useState, useEffect } from "react";
import "./user.sass"
//api
import { getUserFromID } from "../../helpers/api";
//components
//modules
import { useParams } from "react-router-dom";

function User() {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [getError, setGetError] = useState(null);

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
  return (
    <main className="user">
      <header></header>
      <section>
        {user.username}
        {user.id}
      </section>
    </main>
  );
}

export default User;
