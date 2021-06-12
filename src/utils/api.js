import {
  API_URL,
} from './constants';
import { getCookie } from './common';

const getResponseData = (res) => (res.ok
  ? res.json()
  : res.json().then((e) => Promise.reject(e)));

const registerRequest = (data) => fetch(
  `${API_URL}/auth/register`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  },
).then(getResponseData);

const loginRequest = (data) => fetch(
  `${API_URL}/auth/login`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  },
).then(getResponseData);

const refreshTokenRequest = () => fetch(
  `${API_URL}/auth/token`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
  },
).then(getResponseData);

const logoutRequest = () => fetch(
  `${API_URL}/auth/logout`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
  },
).then(getResponseData);

const resetPasswordRequest = (data) => fetch(
  `${API_URL}/password-reset`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  },
).then(getResponseData);

const getIngredientsRequest = () => fetch(
  `${API_URL}/ingredients`,
  {},
).then(getResponseData);

const postOrderRequest = (data) => fetch(
  `${API_URL}/orders`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getCookie('token')}`,
    },
    body: JSON.stringify(data),
  },
).then(getResponseData);

const getUserRequest = () => fetch(
  `${API_URL}/auth/user`,
  {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getCookie('token')}`,
    },
  },
).then(getResponseData);

const patchUserRequest = (data) => fetch(
  `${API_URL}/auth/user`,
  {
    method: 'PATCH',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${getCookie('token')}`,
    },
    body: JSON.stringify(data),
  },
).then(getResponseData);

const confirmPasswordResetRequest = (data) => fetch(
  `${API_URL}/password-reset/reset`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  },
).then(getResponseData);

const api = {
  loginRequest,
  registerRequest,
  refreshTokenRequest,
  logoutRequest,
  resetPasswordRequest,
  getIngredientsRequest,
  postOrderRequest,
  getUserRequest,
  patchUserRequest,
  confirmPasswordResetRequest,
};

export default api;
