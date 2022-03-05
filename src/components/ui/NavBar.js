import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";

const NavBar = () => {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;

  const handleClick = () => {
    if (darkMode) theme.dispatch({ type: "LIGHTMODE" });
    else theme.dispatch({ type: "DARKMODE" });
  };

  return (
    <nav className="flex p-4 shadow-md w-full">
      <Link to={"/"} className="flex-1 w-50">
        <h1>Where in the world?</h1>
      </Link>

      <div className="flex-1 w-50 text-right">
        <button onClick={handleClick}>☾ Dark Mode</button>
      </div>
    </nav>
  );
};

export default NavBar;
