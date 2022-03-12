import { createContext, useEffect, useState } from "react";
import { fetchAllCountries } from "../helpers/fetchCountries";

export const CountriesContext = createContext();

export const CountriesProvider = ({ children }) => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      const resp = await fetchAllCountries();
      setCountries(resp);
    };

    fetchCountries();
  }, [setCountries]);

  return (
    <CountriesContext.Provider
      value={{
        countries,
        setCountries,
      }}
    >
      {children}
    </CountriesContext.Provider>
  );
};
