import axios from "axios";

export const api = axios.create({
  baseURL: 'https://api.dictionaryapi.dev/api/v2/entries/en/',
});

