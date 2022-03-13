import React from "react";

export const Footer = () => {
  const handleClick = () => {
    window.open("https://github.com/Carlos95HD");
  };

  return (
    <footer>
      <div className="cursor-default text-secondary text-center text-sm text-gray-700 p-4">
        © 2022 Copyright -&nbsp;
        <button
          onClick={handleClick}
          className="hover:underline decoration-current"
        >
          Deasi
        </button>
      </div>
    </footer>
  );
};
