import React, { useState, useEffect } from "react";
import "./navbar.sass";
//modueles
import { useHistory } from "react-router-dom";
//icons
import { Bell, ChevronLeft, Search, Settings } from "react-feather";
//componentss
import { useStateValue } from "../../helpers/stateProvider";
import Toggle from "react-toggle";
import "react-toggle/style.css";

function Navbar() {
  //init
  const [{ user }] = useStateValue();
  let history = useHistory();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme == "light" ? "dark" : "light";

    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <main className="navbar">
      <div className="nav-left center">
        <div className="logo">LOGO</div>
        <span
          className="back center"
          onClick={() => {
            history.goBack();
          }}
        >
          <ChevronLeft />
        </span>
        <div className="nav-search center">
          <div className="search-icon">
            <Search />
          </div>
          <input type="text" placeholder="Search"></input>
        </div>
      </div>
      <div className="nav-control">
        <div className="icon center">
          <Settings />
        </div>
        <div className="icon center">
          <Bell />
        </div>
        <Toggle
          icons={false}
          onChange={toggleTheme}
          defaultChecked={theme === "dark"}
        />
        <div
          onClick={() => {
            history.push(`/user/${user}`);
          }}
          className="user-icon"
        />
      </div>
    </main>
  );
}

export default Navbar;
