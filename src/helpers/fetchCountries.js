import { restCountries } from "../api/restCountriesApi";

export const fetchAllCountries = async () => {
  const resp = await restCountries.get('/all');
  const countriesList = resp.data;

  console.log( countriesList )
  return countriesList ;
};

export const fetchByName = async( name ) => {
  const resp = await restCountries.get(`/name/${ name }`);
  const result = resp.data;

  console.log( result )
  return result ;
};