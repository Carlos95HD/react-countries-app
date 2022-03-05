import { createContext, useEffect, useState } from "react";
import { db } from "../data/db";

export const CountriesContext = createContext();

export const CountriesProvider = ({ children }) => {
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    setCountries(db);
  },[]);

    // useEffect(() => {
    // const fetchCountries = async () => {
      //   const resp = await fetchAllCountries();
      //   setCountries(resp);
      // };
      // setLoading(true);
    // fetchCountries();
    // setLoading(false);
  // }, [setCountries]);

  return (
    <CountriesContext.Provider value={{
      countries,
      setCountries,
    }}>
      { children }
    </CountriesContext.Provider>
  )
}