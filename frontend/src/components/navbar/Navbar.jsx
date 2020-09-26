import React, { useState, useEffect } from "react";
import "./navbar.sass";
//modueles
import { useHistory } from "react-router-dom";
//icons
import {
  Notifications,
  NavigateBefore,
  Search,
  Settings,
} from "@material-ui/icons";
//componentss
import { useStateValue } from "../../helpers/stateProvider";
import Toggle from "react-toggle";
import "react-toggle/style.css";

function Navbar() {
  //init
  const [{ user, isDesktop }] = useStateValue();
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
    const newTheme = theme === "light" ? "dark" : "light";

    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div>
      {isDesktop ? (
        <main className="navbar-desk">
          <div className="container-left">
            <img src="../../assets/svgs/videos.svg" alt="logo" />
            <div
              className="back-button center"
              onClick={() => {
                history.goBack();
              }}
            >
              <NavigateBefore />
            </div>
            <div className="searchbox">
              <Search />
              <input placeholder="Search" />
            </div>
          </div>
          <div className="container-right">
            <div className="btn center">
              <Notifications />
            </div>
            <div className="btn center">
              <Settings />
            </div>
            <Toggle
              icons={false}
              onChange={toggleTheme}
              defaultChecked={theme === "dark"}
            />
            <div
              className="usericon"
              onClick={() => {
                history.push(`/user/${user}`);
              }}
            ></div>
          </div>
        </main>
      ) : null}
    </div>
  );
}

export default Navbar;