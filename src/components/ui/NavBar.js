import React from "react";
import { Link } from "react-router-dom";
import { useDarkMode } from "../../hooks/userDarkMode";

const NavBar = () => {
  const [isDark, setIsDark] = useDarkMode();

  const handleDarkMode = () => {
    isDark ? setIsDark(false) : setIsDark(true);
  };

  return (
    <nav className="flex p-6 px-16 shadow-md w-full transition-all duration-300 bg-primary text-primary">
      <Link to={"/"} className="flex-1 w-50">
        <h1 className="font-extrabold text-2xl">Where in the world?</h1>
      </Link>

      <div className="flex-1 w-50 text-right">
        <button className='font-semibold text-lg' onClick={handleDarkMode}>
          <i className='m-1'><ion-icon name="moon-sharp"></ion-icon></i>
          Dark Mode
          </button>
      </div>
    </nav>
  );
};

export default NavBar;
