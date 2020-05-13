const api = 'https://api.themoviedb.org/3';
const key = 'c0cd7a3606ce720bebae5bc90ca829df'; //Minha chave da api, eu deveria fazer algo para esconde-la mas ela eh gratuita entao ok

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
