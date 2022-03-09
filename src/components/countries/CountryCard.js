import React from 'react'
import { Link } from 'react-router-dom'

export const CountryCard = ({
  cca2,
  name,
  population,
  region,
  capital,
  flags
}) => {
  return (
      <Link to={`/country/${cca2}`} className="shadow-md cursor-pointer transition-all duration-300 bg-secondary text-primary">
        <img src={flags.svg} alt={name} className="w-full"/>
        <div className="p-6">
          <h2 className="font-bold">{ name.official }</h2>
          <ul>
            <li>Population: { population }</li>
            <li>Region: { region }</li>
            <li>Capital: { !!capital && capital[0] }</li>
          </ul>
        </div>
      </Link>
  )
}
