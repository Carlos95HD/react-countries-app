import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { CountriesHome } from '../components/countries/CountriesHome'
import { CountryScreen } from '../components/countries/CountryScreen'
import NavBar from '../components/ui/NavBar'
import { CountriesProvider } from '../context/CountriesContext'

export const AppRouter = () => {
  return (
      <CountriesProvider>
        <BrowserRouter>
          <NavBar />

          <div className='h-90vh min-h-auto mx-auto p-4 px-12'>
            <Routes>
              <Route path="/" element={<CountriesHome />} />
              <Route path="/country/:code" element={<CountryScreen />} />
              <Route path="/*" element={<CountriesHome />} />
            </Routes>
          </div>
        </BrowserRouter>
      </CountriesProvider>
  )
}
