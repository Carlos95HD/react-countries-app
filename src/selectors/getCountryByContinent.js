export const countryFilter = ( countries, continent = '') => {
  if (continent !== '') {
    return countries.filter(country => country.region === continent );
  }
  return countries;
}