export const getBorderCountries = ( borders, countries) => {
  return countries.filter(country => borders.includes(country.cca3));
}