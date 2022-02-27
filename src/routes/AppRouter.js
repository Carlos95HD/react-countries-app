import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { CountriesHome } from '../components/countries/CountriesHome'
import NavBar from '../components/ui/NavBar'
import { CountriesProvider } from '../context/CountriesContext'

export const AppRouter = () => {
  return (

    <CountriesProvider>
      <BrowserRouter>
        <NavBar />

        <div className='container h-90vh min-h-auto mx-auto p-4'>
          <Routes>
            <Route path="/home" element={<CountriesHome />} />
            <Route path="/*" element={<CountriesHome />} />
          </Routes>
        </div>
      </BrowserRouter>
    </CountriesProvider>
  )
}
