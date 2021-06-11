import {
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
  REQUEST_INGREDIENTS_SUCCESS,
  REQUEST_INGREDIENTS_FAILED,
  POST_ORDER_SUCCESS,
  POST_ORDER_FAILED,
  API_REQUEST_IN_PROGRESS,
  API_REQUEST_FINISHED,
  SET_CURRENT_ERROR,
} from '../../utils/constants';
import api from '../../utils/api'
import { setCookie, deleteCookie } from '../../utils/common';

const _setTokens = res => {
  const { accessToken, refreshToken } = res;
  const authToken = accessToken?.split('Bearer ')[1];
  if (authToken) setCookie('token', authToken);
  if (refreshToken) localStorage.setItem('refreshToken', refreshToken);
};

const _clearTokens = () => {
  localStorage.removeItem('refreshToken');
  deleteCookie('token');
};

const _refreshToken = afterRefreshFunc => dispatch => {
  api.refreshTokenRequest()
    .then(res => {
      _setTokens(res);
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
const _handleError = (e, type, dispatch, func) => {
  if (e.message === 'jwt expired' && func) {
    dispatch(_refreshToken(func));
  } else {
    dispatch({ type })
    dispatch({
      type: SET_CURRENT_ERROR,
      payload: `что-то пошло не так при запросе на сервер: ${e.message}`,
    });
  }
}

export const register = data => dispatch => {
  dispatch({ type: API_REQUEST_IN_PROGRESS });
  api.registerRequest(data)
    .then(res => {
      _setTokens(res);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.user,
      });
    })
    .catch(e => _handleError(e, REGISTER_FAILED, dispatch))
    .finally(() => dispatch({ type: API_REQUEST_FINISHED }))
  };

export const login = data => dispatch => {
  dispatch({ type: API_REQUEST_IN_PROGRESS });
  api.loginRequest(data)
    .then(res => {
      _setTokens(res);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.user,
      });
    })
    .catch(e => _handleError(e, LOGIN_FAILED, dispatch))
    .finally(() => dispatch({ type: API_REQUEST_FINISHED }))
};

export const logout = () => dispatch => {
  dispatch({ type: API_REQUEST_IN_PROGRESS });
  api.logoutRequest()
    .then(res => {
      _clearTokens();
      console.log(res.message);
      dispatch({ type: CLEAR_FORM_VALUES });
      dispatch({ type: LOGOUT_SUCCESS });
    })
    .catch(e => _handleError(e, LOGOUT_FAILED, dispatch))
    .finally(() => dispatch({ type: API_REQUEST_FINISHED }))
};

export const getUser = () => dispatch => {
  dispatch({ type: API_REQUEST_IN_PROGRESS });
  api.getUserRequest()
    .then(res => 
      dispatch({
        type: GET_USER_SUCCESS,
        payload: res.user,
      })
    )
    .catch(e => _handleError(e, GET_USER_FAILED, dispatch, getUser()))
    .finally(() => dispatch({ type: API_REQUEST_FINISHED }))
};

export const modifyUser = data => dispatch => {
  dispatch({ type: API_REQUEST_IN_PROGRESS });
  api.patchUserRequest(data)
    .then(res => {
      dispatch({
        type: PATCH_USER_SUCCESS,
        payload: res.user,
      });
    })
    .catch(e => _handleError(e, PATCH_USER_FAILED, dispatch, modifyUser()))
    .finally(() => dispatch({ type: API_REQUEST_FINISHED }))
};

export const resetPassword = data => dispatch => {
  dispatch({ type: API_REQUEST_IN_PROGRESS });
  api.resetPasswordRequest(data)
  .then(res => {
    dispatch({
      type: PASSWORD_RESET_SUCCESS,
      payload: data,
    });
  })
  .catch(e => _handleError(e, PASSWORD_RESET_FAILED, dispatch))
  .finally(() => dispatch({ type: API_REQUEST_FINISHED }))
};


export const confirmPasswordReset = data => dispatch => {
  dispatch({ type: API_REQUEST_IN_PROGRESS });
  api.confirmPasswordResetRequest(data)
  .then(res => dispatch({
    type: PASSWORD_RESET_CONFIRMATION_SUCCESS,
    payload: res, 
  }))
  .catch(e => _handleError(e, PASSWORD_RESET_CONFIRMATION_FAILED, dispatch))
  .finally(() => dispatch({ type: API_REQUEST_FINISHED }))
};

export const getIngredients = () => dispatch => {
  dispatch({ type: API_REQUEST_IN_PROGRESS });
  api.getIngredientsRequest()
    .then(res => dispatch({
      type: REQUEST_INGREDIENTS_SUCCESS,
      payload: res.data,
    })
  )
  .catch(e => _handleError(e, REQUEST_INGREDIENTS_FAILED, dispatch))
  .finally(() => dispatch({ type: API_REQUEST_FINISHED }))
};

export const postOrder = data => dispatch => {
  dispatch({ type: API_REQUEST_IN_PROGRESS });
  api.postOrderRequest(data)
    .then(res => dispatch({
      type: POST_ORDER_SUCCESS,
      payload: res,
    }))
    .catch(e => _handleError(e, POST_ORDER_FAILED, dispatch, postOrder()))
    .finally(() => dispatch({ type: API_REQUEST_FINISHED }))
};
