import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { postLogin } from "../helpers/api";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const history = useHistory();

  const handleOnClick = async (e) => {
    e.preventDefault();
    const data = { username, password };
    try {
      const response = await postLogin(data);
      if (response.data.success) {
        const username = response.data.user;
        localStorage.setItem("logged_in_user", username);
        history.replace("/");
      } else {
        setError("Got response but not success");
      }
    } catch {
      setError("Credentials are not valid");
    }
  };

  return (
    <div>
      <div className="form-group">
        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      {error && <div className="form-error">{error}</div>}

      <button onClick={handleOnClick}>Login</button>
    </div>
  );
}
