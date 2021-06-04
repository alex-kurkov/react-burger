import { 
  API_URL,
  API_REQUEST_IN_PROGRESS,
  API_REQUEST_FINISHED,
  SET_CURRENT_ERROR,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAILED,
  PASSWORD_RESET_CONFIRMATION_SUCCESS,
  PASSWORD_RESET_CONFIRMATION_FAILED
} from '../../utils/constants';

export const register = (data) => {
  return function(dispatch) {
    dispatch({ type: API_REQUEST_IN_PROGRESS });
    fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })
    .then(res => res.json())
    .then(res => {
      if (res && res.success) {
        dispatch({
          type: REGISTER_SUCCESS,
          payload: res,
        });
      } else {
        dispatch({ type: REGISTER_FAILED });
        dispatch({
          type: SET_CURRENT_ERROR,
          payload: 'что-то пошло не так при запросе на сервер'
        });
      }
    })
    .catch(e => {
      dispatch({ type: REGISTER_FAILED })
      dispatch({
        type: SET_CURRENT_ERROR,
        payload: `что-то пошло не так при запросе на сервер: ${e.message}`,
      });
    })
    .finally(() => dispatch({ type: API_REQUEST_FINISHED }))
  };
}


export const resetPassword = (data) => {
  return function(dispatch) {
    dispatch({ type: API_REQUEST_IN_PROGRESS });
    fetch(`${API_URL}/password-reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(res => {
      if (res && res.success) {
        dispatch({
          type: PASSWORD_RESET_SUCCESS,
          payload: data,
        });
      } else {
        dispatch({ type: PASSWORD_RESET_FAILED });
        dispatch({
          type: SET_CURRENT_ERROR,
          payload: 'что-то пошло не так при запросе на сервер'
        });
      }
    })
    .catch(e => {
      dispatch({ type: PASSWORD_RESET_FAILED })
      dispatch({
        type: SET_CURRENT_ERROR,
        payload: `что-то пошло не так при запросе на сервер: ${e.message}`,
      });
    })
    .finally(() => dispatch({ type: API_REQUEST_FINISHED }))
  };
}

export const confirmPasswordReset = (data) => {
  return function(dispatch) {
    dispatch({ type: API_REQUEST_IN_PROGRESS });
    fetch(`${API_URL}/password-reset/reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })
    .then(res => res.json())
    .then(res => {
      if (res && res.success) {
        dispatch({
          type: PASSWORD_RESET_CONFIRMATION_SUCCESS,
          payload: res, 
        });
      } else {
        dispatch({ type: PASSWORD_RESET_CONFIRMATION_FAILED });
        dispatch({
          type: SET_CURRENT_ERROR,
          payload: 'что-то пошло не так при запросе на сервер'
        });
      }
    })
    .catch(e => {
      dispatch({ type: PASSWORD_RESET_FAILED })
      dispatch({
        type: SET_CURRENT_ERROR,
        payload: `что-то пошло не так при запросе на сервер: ${e.message}`,
      });
    })
    .finally(() => dispatch({ type: API_REQUEST_FINISHED }))
  };
}