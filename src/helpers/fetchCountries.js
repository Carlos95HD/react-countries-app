import { restCountries } from "../api/restCountriesApi";

export const fetchAllCountries = async () => {
  const resp = await restCountries.get('/all');
  const countriesList = resp.data;

  return countriesList ;
};

export const fetchByName = async( name ) => {
  const resp = await restCountries.get(`/name/${ name }`);
  const result = resp.data;

  return result;
};


export const fetchByCode = async( code ) => {
  const resp = await restCountries.get(`/alpha/${ code }`);
  const result = resp.data;

  return result;
};