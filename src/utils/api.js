import { API_URL } from './constants';

const getResponseData = res => {
  return new Promise((resolve, reject) => {
    const func = res.status < 400 ? resolve : reject;
    res.json().then(func);
  });
}

const getIngredients = () => {
  return fetch(`${API_URL}/ingredients`, {})
    .then(getResponseData)
    .then(res => res.data)
    .catch(e => new Promise.reject(`error while fetching\nurl: ${API_URL}\nerror: ${e.message}`))
}
const postOrder = (data) => {
  return fetch(`${API_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(getResponseData)
    .then(res => res)
    .catch(e => new Promise.reject(`error while fetching\nurl: ${API_URL}\nerror: ${e.message}`))
}

  export { getIngredients, postOrder }
