import React, { useState } from "react";
import { useHistory } from "react-router-dom";
//ICONS

function UserSearch({ user }) {
  //utility fucntions
  let history = useHistory();
  const openCollection = (id) => {
    history.push("/detail/" + id);
  };

  const [bg, setBg] = useState("https://i.stack.imgur.com/frlIf.png");

  //utitlity funcs
  const mystyle = {
    background: `url(${bg}) center / cover`,
  };

  return (
    <div
      className="searchContainer"
      onClick={() => {
        history.push(`user/${user.username}`);
      }}
    >
      <div className="searchCard" style={mystyle}></div>
      <div className="searchText">
        <span className="searchTitle">{user.username}</span>
        <div>{user.email}</div>
      </div>
    </div>
  );
}

export default UserSearch;
