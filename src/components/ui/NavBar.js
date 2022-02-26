import React from 'react'

const NavBar = () => {
  return (
    <nav className="flex p-4 shadow-md w-full">
      <div className="flex-1 w-50">
        <h1>Where in the world?</h1>
      </div>

      <div className="flex-1 w-50 text-right">
        <button>☾ Dark Mode</button>
      </div>
    </nav>
  )
}

export default NavBar;