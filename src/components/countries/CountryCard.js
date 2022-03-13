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
      <Link to={`/country/${cca2}`} className="card-float animate__animated animate__fadeIn shadow-md cursor-pointer rounded transition-all duration-300 bg-secondary text-primary">
        <img src={flags.svg} alt={name} className="w-full rounded-t"/>
        <div className="p-6">
          <h2 className="font-bold text-lg">{ name.official }</h2>
          <ul className='text-sm mt-2'>
            <li>
              <span className="font-bold">
              Population: &nbsp;
              </span>
              { population }
            </li>
            <li>
              <span className="font-bold">
              Region: &nbsp;
              </span>
              { region }
            </li>
            <li>
              <span className="font-bold">
              Capital: &nbsp;
              </span>
              { !!capital && capital[0] }
            </li>
          </ul>
        </div>
      </Link>
  )
}
