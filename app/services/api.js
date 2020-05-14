import { REACT_APP_TMDB_API_KEY, REACT_APP_TMDB_URL } from 'react-native-dotenv';

const key = REACT_APP_TMDB_API_KEY; // security mesures
const api = REACT_APP_TMDB_URL;

const defaultContent = {
  api_key: key,
  language: 'pt-BR'
};

function queryString(obj) {
  return Object.entries(obj)
    .map(([index, val]) => `${index}=${val}`)
    .join('&');
}

export default async function request(url, content = {}, debug = false) {
  const obj = { ...defaultContent, ...content };

  const response = await fetch(`${api}/${url}?${queryString(obj)}`);
  const data = await (debug ? response.status : response.json());

  return data;
}
