import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { CountriesHome } from '../components/countries/CountriesHome'
import { CountryScreen } from '../components/countries/CountryScreen'
import NavBar from '../components/ui/NavBar'
import { CountriesProvider } from '../context/CountriesContext'
import { Footer } from '../components/footer/Footer'

export const AppRouter = () => {
  return (
      <CountriesProvider>
        <BrowserRouter className="bg-primary">
            <NavBar />

            <div className='mt-2 min-h-[80vh] mx-auto p-4 sm:px-12 transition-all duration-300 bg-primary text-primary'>
              <Routes>
                <Route path="/" element={<CountriesHome />} />
                <Route path="/country/:code" element={<CountryScreen />} />
                <Route path="/*" element={<CountriesHome />} />
              </Routes>
            </div>

            <Footer />
        </BrowserRouter>
      </CountriesProvider>
  )
}
