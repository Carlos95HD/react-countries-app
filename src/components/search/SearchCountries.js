import React, { useContext, useEffect, useState } from "react";
import { fetchAllCountries, fetchByName } from "../../helpers/fetchCountries";
import { CountriesContext } from "../../context/CountriesContext";
import { CountryCard } from "../countries/CountryCard";
import { Field, Form, Formik } from "formik";
import { countryFilter } from "../../selectors/getCountryByContinent";

export const SearchCountries = () => {
  const [continent, setContinent] = useState("");
  const { countries, setCountries } = useContext(CountriesContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCountries = async () => {
      const resp = await fetchAllCountries();
      setCountries(resp);
    };
    setLoading(true);
    fetchCountries();
    setLoading(false);
  }, []);

  const filteredCountry = () => {
    return countries.slice(0, 8);
  };

  const handleChange = ({ target }) => {
    setContinent(target.value);
  };

  const handleSubmit = async ({ search }) => {
    setLoading(true);
    const resp = await fetchByName(search);
    setCountries(countryFilter(resp, continent));
    setLoading(false);
  };

  return (
    <>
      <Formik
        initialValues={{ search: "", continent: "" }}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className="flex p-4 w-full">
            <div className="flex-1 w-50">
              <div className="align-middle">
                <button type="submit" className="absolute m-4 text-neutral-500">
                  <ion-icon name="search-sharp"></ion-icon>
                </button>
                <Field
                  name="search"
                  type="text"
                  className="shadow-md mt-1 pl-11 py-4 bg-white shadow-md border-slate-300 placeholder-slate-400 w-3/5 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-sm sm:text-sm focus:ring-1"
                  placeholder="Search for a country..."
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="flex-1 w-50 text-right p-2">
              <Field
                as="select"
                name="continent"
                value={continent}
                onChange={handleChange}
              >
                <option hidden className="border-none">
                  Filter by Region
                </option>
                <option value="Africa">Africa</option>
                <option value="Americas">America</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europe</option>
                <option value="Oceania">Oceania</option>
              </Field>
            </div>
          </Form>
        )}
      </Formik>

      <div className="grid grid-cols-4 grid-rows-2 gap-8 p-4">
        {loading ? (
          <p>Loading...</p>
        ) : (
          filteredCountry().map((country) => (
            <CountryCard key={country.area} {...country} />
          ))
        )}
      </div>
    </>
  );
};
