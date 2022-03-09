import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { CountriesContext } from "../../context/CountriesContext";
import { fetchByCode } from "../../helpers/fetchCountries";
import { getBorderCountries } from "../../selectors/getBorderCountries";
import { Spinner } from "../ui/Spinner";

export const CountryScreen = () => {
  const { countries } = useContext(CountriesContext);
  const [ loading, setLoading ] = useState(false)
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
    <div className='grid h-full p-4'>
      <div className='flex mt-4'>
        <button 
          onClick={handleReturn}
          className="btn col-span-2 p-5 shadow-md rounded-md transition-all duration-300 bg-secondary text-primary"
          >
            Back
        </button>
      </div>

      {
        loading ?
        <div className="flex h-96 justify-self-center items-center">
          <Spinner />
        </div>
        :
        <div className="flex mt-4">
          <div className="w-1/2 flex items-center">
              <img src={flags?.svg} alt="name" className="w-10/12"/>
          </div>

          <div className="grid w-1/2 content-center gap-y-12">
            <h1 className="text-2xl font-bold">{name && name.official}</h1>

            <div className="grid grid-cols-2">
              <ul className="">
                <li>
                  <span className='font-semibold mr-1'>
                    Native name: 
                  </span>
                    { nativeName && nativeName[0].official}
                </li>
                <li>
                  <span className='font-semibold mr-1'>
                    Population: 
                  </span>
                    {population}
                </li>
                <li>
                  <span className='font-semibold mr-1'>
                    Region: 
                  </span>
                    {region}
                </li>
                <li>
                  <span className='font-semibold mr-1'>
                    Sub Region: 
                  </span>
                    {subregion}
                </li>
                <li>
                  <span className='font-semibold mr-1'>
                    Capital: 
                  </span>
                    {capital}
                </li>
              </ul>
              <ul className="">
                <li>
                  <span className='font-semibold mr-1'>
                  Top Level Domain:
                  </span>
                   {tld?.[0]}
                </li>
                <li>
                  <span className='font-semibold mr-1'>
                  Currencies:
                  </span>
                   { currenciesArray && currenciesArray[0].name }
                </li>
                <li>
                  <span className='font-semibold'>
                  Languages:
                  </span>
                   { languagesArray && languagesArray.join(", ") }
                </li>
              </ul>
            </div>

            <div className='inline-flex h-min'>
              <p className='font-semibold'>Border Countries: </p>
              <ul className="flex flex-wrap ml-2">
                {
                !!borders ? getBorders.map( border  => (
                    <Link to={`/country/${border.cca2}`}
                      key={border.cca2}
                      className="btn text-sm mb-1 mx-1 h-min col-span-auto p-5 shadow-md rounded-md transition-all duration-300 bg-secondary text-primary"
                    >
                      {border.name.official}
                    </Link>
                  ))
                  : ''
                }
              </ul>
            </div>
          </div>
        </div>
      }
    </div>
  );
};
