import React from "react";
import { getLogout } from "../helpers/api";
import { useHistory, Link } from "react-router-dom";

export default function Home() {
  const history = useHistory();

  const handleLogout = async () => {
    try {
      await getLogout();
      history.push("/login");
    } catch {
      alert("Oops error happened");
    }
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      You're successfully logged in.
      <p>
        <Link to="/collections">Go to collections</Link>
      </p>
    </div>
  );
}
