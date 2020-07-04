import React, { useState } from "react";
import { postLogin } from "../helpers/api";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleOnClick = async (e) => {
    e.preventDefault();
    const data = { username, password };
    try {
      const response = await postLogin(data);
      if (response.data.success) {
        // success
      } else {
        setError("Credentials are not valid");
      }
    } catch {
      setError("Uh oh something happened");
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
        />
      </div>

      <div className="form-group">
        <label>Password</label>
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {error && <div className="form-error">{error}</div>}

      <button onClick={handleOnClick}>Login</button>
    </div>
  );
}
