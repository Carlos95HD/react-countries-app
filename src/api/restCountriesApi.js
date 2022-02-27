import axios from 'axios';

export const restCountries = axios.create({
    baseURL: 'https://restcountries.com/v3.1'
});