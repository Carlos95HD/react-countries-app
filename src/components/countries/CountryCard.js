import React from 'react'

export const CountryCard = ({
  name,
  population,
  region,
  capital,
  flags
}) => {
  return (
      <div className="shadow-md cursor-pointer">
        <img src={flags.svg} alt="Argentina" className="w-full"/>
        <div className="p-6">
          <h2 className="font-bold">{ name.official }</h2>
          <ul>
            <li>Population: { population }</li>
            <li>Region: { region }</li>
            <li>Capital: { !!capital && capital[0] }</li>
          </ul>
        </div>
      </div>
  )
}
