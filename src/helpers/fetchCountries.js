import { restCountries } from "../api/restCountriesApi";

export const fetchAllCountries = async () => {
  try {
    const resp = await restCountries.get('/all');
    const countriesList = resp.data;
    return countriesList ;

  } catch (error) {
    return [];
  }
};

export const fetchByName = async( name ) => {
  try {
    const resp = await restCountries.get(`/name/${ name }`);
    const result = resp.data;
    return result;

  } catch (error) {
    return [];
  }
};


export const fetchByCode = async( code ) => {
  try {
    const resp = await restCountries.get(`/alpha/${ code }`);
    return resp.data;

  } catch (error) {
    return [];
  }

};