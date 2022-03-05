export const getCountryByCode = ( countrycca2 = '', countries ) => {
  return countries.find(country => country.cca2 === countrycca2);
}
