import React from 'react'

export const CountriesCard = () => {
  return (
      <div className="shadow-md">
        <img src="https://flagcdn.com/ar.svg" alt="Argentina" className="w-full"/>

        <div className="p-6">
          <h2 className="font-bold">Argentina</h2>
          <ul>
            <li>Population:</li>
            <li>Region:</li>
            <li>Capital:</li>
          </ul>
        </div>
      </div>
  )
}
