import React, { useContext, useEffect, useState } from "react";
import { fetchByName } from "../../helpers/fetchCountries";
import { CountriesContext } from "../../context/CountriesContext";
import { CountryCard } from "../countries/CountryCard";
import { Field, Form, Formik } from "formik";
import { countryFilter } from "../../selectors/getCountryByContinent";
import ReactPaginate from "react-paginate";
import { Spinner } from "../ui/Spinner";

export const SearchCountries = () => {
  const { countries } = useContext(CountriesContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState([]);
  const [continent, setContinent] = useState("");
  const [pageNumber, setPageNumber] = useState(0);

  useEffect(() => {
    setSearch(countries);
    setLoading(false);
  }, [countries]);

  const handleChange = ({ target }) => {
    setContinent(target.value);
  };

  const handleSearch = async ({ search }) => {
    setLoading(true);
    const resp = await fetchByName(search);
    const filter = countryFilter(resp, continent);

    resp.length === 0 && setError(true);
    setSearch(filter);
    setLoading(false);
    setPageNumber(0);
  };

  const handleLoadCountries = () => {
    setSearch(countries);
    setError(false);
  };

  const countriesPerPage = 8;
  const pagesVisited = pageNumber * countriesPerPage;

  //40 -> 50
  const displayCountries = search.slice(
    pagesVisited,
    pagesVisited + countriesPerPage
  );
  const pageCount = Math.ceil(search.length / countriesPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div className="h-full">
      <Formik
        initialValues={{ search: "", continent: "" }}
        onSubmit={handleSearch}
        validate={(values) => {
          let errors = {};
          if (!values.search) {
            errors.search = "Enter a name";
          }

          return errors;
        }}
      >
        {({ errors }) => (
          <Form className="lg:flex p-4 w-full">
            <div className="lg:flex-1 lg:w-50">
              <div className="align-middle">
                <button
                  type="submit"
                  className="absolute cursor-default m-4 mt-5 text-neutral-500 transition-all duration-300 input-gray"
                >
                  <i className="flex">
                    <ion-icon name="search-sharp"></ion-icon>
                  </i>
                </button>
                <Field
                  name="search"
                  type="text"
                  className="input-gray shadow-md mt-1 pl-11 py-5 border-slate-300 placeholder-slate-400 sm:w-3/5 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded sm:text-sm focus:ring-1 transition-all duration-300 bg-secondary"
                  placeholder="Search for a country..."
                  autoComplete="off"
                />
                <span className="absolute text-red-500 font-semibold mt-2 ml-1">
                  {errors.search}
                </span>
              </div>
            </div>
            <div className="flex-1 mt-8 w-50 lg:mt-0 lg:text-right">
              <Field
                as="select"
                className="font-light p-5 shadow-md rounded transition-all duration-300 bg-secondary text-primary"
                name="continent"
                value={continent}
                onChange={handleChange}
              >
                <option hidden>Filter by Region</option>
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

      {loading ? (
        <div className="flex h-96 justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 grid-rows-2 gap-16 lg:gap-16 xl:gap-20 gap-x-24 mt-4 p-4 h-5/6 h-auto">
            {search.length > 0 &&
              displayCountries.map((country) => (
                <CountryCard key={country.cca2} {...country} />
              ))}
            {error ? (
              <div className="absolute p-2 font-normal rounded bg-red-500 text-xl shadow-lg">
                <div className="py-2 px-4 text-white">
                  No results found
                  <p className="text-sm font-base text-white">
                    To show all available countries click&nbsp;
                    <span
                      className="cursor-pointer"
                      onClick={handleLoadCountries}
                    >
                      here.
                    </span>
                  </p>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
          {search.length > 0 && (
            <div className="flex">
              <ReactPaginate
                marginPagesDisplayed={1}
                pageRangeDisplayed={2}
                previousLabel={
                  <ion-icon name="chevron-back-outline"></ion-icon>
                }
                nextLabel={<ion-icon name="chevron-forward-outline"></ion-icon>}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={"pagination shadow-md"}
                subContainerClassName={"pages pagination shadow-md"}
                activeClassName={"active shadow-md"}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};
