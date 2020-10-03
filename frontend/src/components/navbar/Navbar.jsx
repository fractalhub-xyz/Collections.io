import React, { useState, useEffect, useCallback } from "react";
import "./navbar.sass";
//modueles
import { useHistory, useParams } from "react-router-dom";
import { debounce } from "../../helpers/debounce";
//icons
import { Search } from "@material-ui/icons";
//componentss
import Toggle from "react-toggle";
import "react-toggle/style.css";
import logo from "../../assets/svgs/Logo.png";

function Navbar() {
  //init
  let history = useHistory();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const params = useParams();

  const debouncedHandler = useCallback(
    debounce((value) => {
      history.push(`/search/${value}`);
    }, 500),
    [],
  );

  const inputOnChange = (e) => {
    const value = e.target.value;
    debouncedHandler(value);
  };

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
    <main className="navbar-desk">
      <div className="container-left">
        <img src={logo} alt="logo" className="colelctions-logo" />
        <div className="searchbox">
          <Search />
          <input placeholder="Search" onChange={inputOnChange} />
        </div>
      </div>
      <div className="container-right">
        {/* <div
          className="btn center hide"
          onClick={() => {
            history.push("/");
          }}
        >
          <VoiceOverOff />
        </div> */}
        <Toggle
          icons={false}
          onChange={toggleTheme}
          defaultChecked={theme === "dark"}
        />
        <div
          className="usericon"
          onClick={() => {
            history.push(`/user/${localStorage.getItem("user")}`);
          }}
        ></div>
      </div>
    </main>
  );
}

export default Navbar;
