import { useContext, useEffect, useState } from "react";
import { CountriesContext } from "../context/CountriesContext";
import { fetchByName } from "../helpers/fetchCountries";
import { countryFilter } from "../selectors/getCountryByContinent";

export const useSearchCountries = () => {
  const { countries } = useContext(CountriesContext);
  const [search, setSearch] = useState({
    result: [],
    error: null,
    loading: true,
  });

  useEffect(() => {
    setSearch({
      result: countries,
      error: null,
      loading: false,
    });
  }, [countries]);

  const searchCountry = async (search, continent) => {
    startLoading();
    const resp = await fetchByName(search);
    const filter = countryFilter(resp, continent);

    if (resp.length > 0) {
      setSearch({
        result: filter,
        error: null,
        loading: false,
      });
    } else {
      setSearch({
        result: filter,
        error: true,
        loading: false,
      });
    }
  };

  const loadAllCountries = () => {
    startLoading();
    setSearch({
      result: countries,
      error: false,
      loading: false,
    });
  };

  const startLoading = () => {
    setSearch({
      ...search,
      loading: true,
    });
  };

  return [search, searchCountry, loadAllCountries];
};
