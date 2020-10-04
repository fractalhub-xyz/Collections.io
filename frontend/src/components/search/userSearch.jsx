import { AccountCircle } from "@material-ui/icons";
import React from "react";
import { useHistory } from "react-router-dom";
import "./search.sass";
function UserSearch({ user }) {
  let history = useHistory();
  return (
    <div
      className="row c7"
      onClick={() => {
        history.push(`/user/${user.username}`);
      }}
    >
      <div className="info">
        <div className="icon">
          <AccountCircle />
        </div>
        <div className="title">{user.username}</div>
      </div>
    </div>
  );
}

export default UserSearch;
