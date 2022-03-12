import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { CountriesContext } from "../../context/CountriesContext";
import { fetchByCode } from "../../helpers/fetchCountries";
import { getBorderCountries } from "../../selectors/getBorderCountries";
import { Spinner } from "../ui/Spinner";

export const CountryScreen = () => {
  const { countries } = useContext(CountriesContext);
  const [loading, setLoading] = useState(false);
  const { code } = useParams();
  const navigate = useNavigate();
  const [country, setcountry] = useState(null);

  useEffect(() => {
    let cancel = false;

    const fetchCountry = async () => {
      setLoading(true);
      const resp = await fetchByCode(code);
      if (cancel) return;
      setcountry(resp);
      setLoading(false);
    };

    fetchCountry();
    return () => {
      cancel = true;
    };
  }, [code]);

  const handleReturn = () => {
    navigate(-1);
  };

  const {
    flags,
    name,
    population,
    region,
    capital,
    subregion,
    tld,
    currencies,
    languages,
    borders,
  } = !!country && country[0];

  const nativeName = name?.nativeName && Object.values(name.nativeName);
  const currenciesArray = !!currencies && Object.values(currencies);
  const languagesArray = !!languages && Object.values(languages);
  const getBorders = !!borders && getBorderCountries(borders, countries);

  return (
    <div className="grid h-full p-4">
      <div className="flex mt-4">
        <button
          onClick={handleReturn}
          className="btn p-2 px-4 col-span-2 flex items-center shadow-lg rounded transition-all duration-300 bg-secondary text-primary hover:bg-slate-50 dark:hover:bg-sky-900"
        >
          <i className="flex mx-2">
            <ion-icon name="arrow-back-outline"></ion-icon>
          </i>
          <span className="mx-2">Back</span>
        </button>
      </div>

      {loading ? (
        <div className="flex h-96 justify-self-center items-center">
          <Spinner />
        </div>
      ) : (
        <div className="sm:grid lg:flex mt-16">
          <div className="lg:w-1/2 flex items-center">
            <img
              src={flags?.svg}
              alt="name"
              className="lg:w-10/12 animate__animated animate__fadeIn"
            />
          </div>

          <div className="grid lg:w-1/2 content-center gap-y-8 lg:gap-y-12 animate__animated animate__fadeIn">
            <h1 className="mt-8 lg:mt-0 text-2xl font-bold">
              {name ? name.official : "n/a"}
            </h1>

            <div className="grid lg:grid-cols-2 text-base">
              <ul className="">
                <li>
                  <span className="font-semibold mr-1">Native name:</span>
                  {nativeName ? nativeName[0].official : "N/A"}
                </li>
                <li>
                  <span className="font-semibold mr-1">Population:</span>
                  {population ? population : "N/A"}
                </li>
                <li>
                  <span className="font-semibold mr-1">Region:</span>
                  {region ? region : "N/A"}
                </li>
                <li>
                  <span className="font-semibold mr-1">Sub Region:</span>
                  {subregion ? subregion : "N/A"}
                </li>
                <li>
                  <span className="font-semibold mr-1">Capital:</span>
                  {capital ? capital : "N/A"}
                </li>
              </ul>

              <ul className="mt-8 lg:mt-0">
                <li>
                  <span className="font-semibold mr-1">Top Level Domain:</span>
                  {tld?.[0] ? tld?.[0] : "N/A"}
                </li>
                <li>
                  <span className="font-semibold mr-1">Currencies:</span>
                  {currenciesArray ? currenciesArray[0].name : "N/A"}
                </li>
                <li>
                  <span className="font-semibold">Languages:&nbsp;</span>
                  {languagesArray ? languagesArray.join(", ") : "N/A"}
                </li>
              </ul>
            </div>

            <div className="lg:inline-flex h-min">
              <p className="font-semibold">Border Countries:</p>
              <ul className="flex flex-wrap gap-2 mt-4 mr-2 lg:ml-2 lg:mt-0">
                {!!borders
                  ? getBorders.map((border) => (
                      <Link
                        to={`/country/${border.cca2}`}
                        key={border.cca2}
                        className="btn text-sm mb-1 mx-0 lg:mx-1 h-min col-span-auto p-2 shadow-lg rounded transition-all duration-300 bg-secondary text-primary hover:bg-slate-50 dark:hover:bg-sky-900"
                      >
                        {border.name.official}
                      </Link>
                    ))
                  : "N/A"}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
