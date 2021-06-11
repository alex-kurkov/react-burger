import {
  API_REQUEST_IN_PROGRESS,
  API_REQUEST_FINISHED,
  SET_CURRENT_ERROR,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAILED,
  PASSWORD_RESET_CONFIRMATION_SUCCESS,
  PASSWORD_RESET_CONFIRMATION_FAILED,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  REFRESH_TOKENS_SUCCESS,
  REFRESH_TOKENS_FAILED,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  PATCH_USER_SUCCESS,
  PATCH_USER_FAILED,
  CLEAR_FORM_VALUES,
} from '../../utils/constants';
import { 
  registerRequest,
  resetPasswordRequest,
  loginRequest,
  refreshTokenRequest,
  logoutRequest,
  getUserRequest,
  patchUserRequest,
  confirmPasswordResetRequest
 } from '../../utils/api'
import { setCookie, deleteCookie } from '../../utils/common';
import { setProfileFormValue } from '../actions/form';

const setTokens = res => {
  const { accessToken, refreshToken } = res;
  const authToken = accessToken?.split('Bearer ')[1];

  if (authToken) {
    setCookie('token', authToken);
  }
  if (refreshToken) {
    localStorage.setItem('refreshToken', refreshToken);
  }
}

const clearTokens = () => {
  localStorage.removeItem('refreshToken');
  deleteCookie('token');
}

const setProfileFormValues = (dispatch, { name = '', email = '' }) => {
  dispatch(setProfileFormValue('name', name))
  dispatch(setProfileFormValue('email', email))
}

export const register = data => dispatch => {
    dispatch({ type: API_REQUEST_IN_PROGRESS });
    registerRequest(data)
      .then(res => {
        setTokens(res);
        dispatch({
          type: REGISTER_SUCCESS,
          payload: res.user,
        });
        setProfileFormValues(dispatch, res.user);
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

export const login = data => dispatch => {
  dispatch({ type: API_REQUEST_IN_PROGRESS });
  loginRequest(data)
    .then(res => {
      setTokens(res);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.user,
      });
      setProfileFormValues(dispatch, res.user);
    })
    .catch(e => {
      dispatch({ type: LOGIN_FAILED })
      dispatch({
        type: SET_CURRENT_ERROR,
        payload: `что-то пошло не так при запросе на сервер: ${e.message}`,
      });
    })
  .finally(() => dispatch({ type: API_REQUEST_FINISHED }))
};

export const refreshToken = afterRefreshFunc => dispatch => {
  refreshTokenRequest()
    .then(res => {
      setTokens(res);
      dispatch({ type: REFRESH_TOKENS_SUCCESS });
      dispatch(afterRefreshFunc);
    })
    .catch(e => {
      dispatch({ type: REFRESH_TOKENS_FAILED })
      dispatch({
        type: SET_CURRENT_ERROR,
        payload: `что-то пошло не так при запросе на сервер: ${e.message}`,
      });
    })
};

export const logout = () => dispatch => {
  dispatch({ type: API_REQUEST_IN_PROGRESS });
  logoutRequest()
    .then(res => {
      clearTokens();
      console.log(res.message);
      dispatch({ type: CLEAR_FORM_VALUES });
      dispatch({ type: LOGOUT_SUCCESS });
    })
    .catch(e => {
      dispatch({ type: LOGOUT_FAILED })
      dispatch({
        type: SET_CURRENT_ERROR,
        payload: `что-то пошло не так при запросе на сервер: ${e.message}`,
      });
    })
    .finally(() => dispatch({ type: API_REQUEST_FINISHED }))
};

export const getUser = () => dispatch => {
  dispatch({ type: API_REQUEST_IN_PROGRESS });
  getUserRequest()
    .then(res => {
      dispatch({
        type: GET_USER_SUCCESS,
        payload: res.user,
      });
      setProfileFormValues(dispatch, res.user);
    })
    .catch(e => {
      if (e.massage === 'jwt expired') {
        dispatch(refreshToken(getUser()));
      } else {
        dispatch({ type: GET_USER_FAILED })
        dispatch({
          type: SET_CURRENT_ERROR,
          payload: `что-то пошло не так при запросе на сервер: ${e.message}`,
        });
      }
    })
    .finally(() => dispatch({ type: API_REQUEST_FINISHED }))
};

export const modifyUser = data => {
  return function(dispatch) {
    dispatch({ type: API_REQUEST_IN_PROGRESS });
    patchUserRequest(data)
      .then(res => {
        dispatch({
          type: PATCH_USER_SUCCESS,
          payload: res.user,
        });
        setProfileFormValues(dispatch, res.user);
      })
      .catch(e => {
        dispatch({ type: PATCH_USER_FAILED })
        dispatch({
          type: SET_CURRENT_ERROR,
          payload: `что-то пошло не так при запросе на сервер: ${e.message}`,
        });
      })
      .finally(() => dispatch({ type: API_REQUEST_FINISHED }))
  };
}

export const resetPassword = data => dispatch => {
  dispatch({ type: API_REQUEST_IN_PROGRESS });
  resetPasswordRequest(data)
  .then(res => {
    dispatch({
      type: PASSWORD_RESET_SUCCESS,
      payload: data,
    });
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


export const confirmPasswordReset = data => dispatch => {
  dispatch({ type: API_REQUEST_IN_PROGRESS });
  confirmPasswordResetRequest(data)
  .then(res => dispatch({
    type: PASSWORD_RESET_CONFIRMATION_SUCCESS,
    payload: res, 
  }))
  .catch(e => {
    dispatch({ type: PASSWORD_RESET_CONFIRMATION_FAILED })
    dispatch({
      type: SET_CURRENT_ERROR,
      payload: `что-то пошло не так при запросе на сервер: ${e.message}`,
    });
  })
  .finally(() => dispatch({ type: API_REQUEST_FINISHED }))
};
