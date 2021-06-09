import { 
  API_URL,
} from './constants';

export const registerRequest = data => fetch(
  `${API_URL}/auth/register`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  }
)
export const loginRequest = data => fetch(
  `${API_URL}/auth/login`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  }
)
export const refreshTokenRequest = refreshToken => fetch(
  `${API_URL}/auth/token`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({refreshToken}),
  }
)
export const logoutRequest = refreshToken => fetch(
  `${API_URL}/auth/logout`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ token: refreshToken }),
  }
)

export const resetPasswordRequest = data => fetch(
  `${API_URL}/password-reset`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  }
)

export const getIngredientsRequest = () => fetch(`${API_URL}/ingredients`, {})

export const postOrderRequest = data => fetch(
  `${API_URL}/orders`, 
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }
)

export const getUserRequest = token => fetch(
  `${API_URL}/auth/user`,
  {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
  }
)
export const patchUserRequest = (token, data) => fetch(
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
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data),
  }
)
export const Request = data => fetch(
  `${API_URL}/ingredients`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }
)