import React from "react";
import { Link } from "react-router-dom";
import { useDarkMode } from "../../hooks/userDarkMode";

const NavBar = () => {
  const [isDark, setIsDark] = useDarkMode();

  const handleDarkMode = () => {
    isDark ? setIsDark(false) : setIsDark(true);
  };

  return (
    <nav className="flex p-4 shadow-md w-full transition-all duration-300 bg-secondary text-primary">
      <Link to={"/"} className="flex-1 w-50">
        <h1>Where in the world?</h1>
      </Link>

      <div className="flex-1 w-50 text-right">
        <button onClick={handleDarkMode}>☾ Dark Mode</button>
      </div>
    </nav>
  );
};

export default NavBar;
