import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { CountriesContext } from "../../context/CountriesContext";
import { fetchByCode } from "../../helpers/fetchCountries";
import { getBorderCountries } from "../../selectors/getBorderCountries";

export const CountryScreen = () => {
  const { code } = useParams();
  const navigate = useNavigate();
  const { countries } = useContext(CountriesContext);
  const [country, setcountry] = useState(null);

  useEffect(() => {
    let cancel = false;

    const fetchCountry = async () => {
      const resp = await fetchByCode(code);
      if (cancel) return;
      setcountry(resp);
    }

    fetchCountry();
    return () => {
      cancel = true;
    }
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
    borders
  } = !!country && country[0];

  const nativeName = name?.nativeName && Object.values(name.nativeName);
  const currenciesArray = !!currencies && Object.values(currencies);
  const languagesArray = !!languages && Object.values(languages);
  const getBorders = !!borders && getBorderCountries(borders, countries);

  return (
    <>
      <button onClick={handleReturn} className="btn shadow-lg rounded border">
        Back
      </button>

      {
        !!country &&
        <div className="flex container mx-auto">
          <div className="w-1/2">
            <img src={flags?.svg} alt="name" className="w-1/2" />
          </div>

          <div className="w-1/2">
            <h1 className="text-2xl font-bold">{name && name.official}</h1>

            <div className="grid grid-cols-2">
              <ul className="col-auto">
                <li>Native name: { nativeName && nativeName[0].official}</li>
                <li>Population: {population}</li>
                <li>Region: {region}</li>
                <li>Sub Region: {subregion}</li>
                <li>Capital: {capital}</li>
              </ul>
              <ul className="col-auto">
                <li>Top Level Domain: {tld?.[0]}</li>
                <li>Currencies: { currenciesArray && currenciesArray[0].name }</li>
                <li>Languages: { languagesArray && languagesArray.join(", ") }</li>
              </ul>
            </div>

            <div className='flex'>
              <p>Border Countries: </p>
              <ul>
                {
                !!borders ? getBorders.map( border  => (
                    <Link to={`/country/${border.cca2}`}  key={border.cca2} className="btn m-2" >{border.name.official}</Link>
                  ))
                  : ''
                }
              </ul>
            </div>
          </div>
        </div>
      }
    </>
  );
};
