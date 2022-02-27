import React, { useContext, useEffect, useState } from 'react'
// import { fetchAllCountries } from '../../helpers/fetchCountries'
import { CountriesContext } from '../../context/CountriesContext'

export const SearchCountries = () => {
  const { setCountries } = useContext(CountriesContext);
  const [ continent, setContinent ] = useState('')

  const handleChange = ({ target }) => {
    setContinent(target.value)
  }

  const handleSubmit = ({ search }) => {
    //TODO: filtrar por nombre
  }

  return (
    <form className="flex p-4 w-full">
      <div className="flex-1 w-50">
        <div className="align-middle">
          <button type='submit' className="absolute m-4 text-neutral-500">
            <ion-icon name="search-sharp"></ion-icon>
          </button>
          <input
            name='search'
            type="text"
            className="shadow-md mt-1 pl-11 py-4 bg-white shadow-md border-slate-300 placeholder-slate-400 w-3/5 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-sm sm:text-sm focus:ring-1"
            placeholder='Search for a country...'
            autoComplete='off'
            />
        </div>
      </div>

      <div className="flex-1 w-50 text-right p-2">
        <select name="continent" value={ continent } onChange={ handleChange }>
        <option hidden className='border-none'>Filter by Region</option>
          <option value="Africa">Africa</option>
          <option value="Americas">America</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>
    </form>
  )
}
