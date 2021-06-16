import * as types from '../../utils/constants';
import api from '../../utils/api';
import { setCookie, deleteCookie } from '../../utils/common';

const _setTokens = (res) => {
  const { accessToken, refreshToken } = res;
  const authToken = accessToken?.split('Bearer ')[1];
  if (authToken) setCookie('token', authToken);
  if (refreshToken) localStorage.setItem('refreshToken', refreshToken);
};

const _clearTokens = () => {
  localStorage.removeItem('refreshToken');
  deleteCookie('token');
};

const requestStarted = () => ({ type: types.API_REQUEST_IN_PROGRESS });
const requestFinished = () => ({ type: types.API_REQUEST_FINISHED });

const _refreshToken = (afterRefreshFunc) => (dispatch) => {
  api.refreshTokenRequest()
    .then((res) => {
      _setTokens(res);
      dispatch({ type: types.REFRESH_TOKENS_SUCCESS });
      dispatch(afterRefreshFunc);
    })
    .catch((e) => {
      dispatch({ type: types.REFRESH_TOKENS_FAILED });
      dispatch({
        type: types.SET_CURRENT_ERROR,
        payload: `что-то пошло не так при запросе на сервер: ${e.message}`,
      });
    });
};
const _handleError = (e, type, dispatch, func) => {
  if ((e.message === 'jwt expired' || e.message === 'jwt malformed') && func) {
    dispatch(_refreshToken(func));
  } else {
    dispatch({ type });
    dispatch({
      type: types.SET_CURRENT_ERROR,
      payload: `что-то пошло не так при запросе на сервер: ${e.message}`,
    });
  }
};

export const register = (data) => async (dispatch) => {
  dispatch(requestStarted());
  await api.registerRequest(data)
    .then((res) => {
      _setTokens(res);
      dispatch({
        type: types.REGISTER_SUCCESS,
        payload: res.user,
      });
    })
    .catch((e) => _handleError(e, types.REGISTER_FAILED, dispatch))
    .finally(() => dispatch(requestFinished()));
};

export const login = (data) => async (dispatch) => {
  dispatch(requestStarted());
  await api.loginRequest(data)
    .then((res) => {
      _setTokens(res);
      dispatch({
        type: types.LOGIN_SUCCESS,
        payload: res.user,
      });
    })
    .catch((e) => _handleError(e, types.LOGIN_FAILED, dispatch))
    .finally(() => dispatch(requestFinished()));
};

export const logout = () => async (dispatch) => {
  dispatch(requestStarted());
  await api.logoutRequest()
    .then((res) => {
      _clearTokens();
      // eslint-disable-next-line no-console
      console.log(res.message);
      dispatch({ type: types.CLEAR_FORM_VALUES });
      dispatch({ type: types.LOGOUT_SUCCESS });
    })
    .catch((e) => _handleError(e, types.LOGOUT_FAILED, dispatch))
    .finally(() => dispatch(requestFinished()));
};

export const getUser = () => (dispatch) => {
  if (!localStorage.getItem('refreshToken')) return;
  dispatch(requestStarted());
  api.getUserRequest()
    .then((res) => dispatch({
      type: types.GET_USER_SUCCESS,
      payload: res.user,
    }))
    .catch((e) => _handleError(e, types.GET_USER_FAILED, dispatch, getUser()))
    .finally(() => dispatch(requestFinished()));
};

export const modifyUser = (data) => (dispatch) => {
  dispatch(requestStarted());
  api.patchUserRequest(data)
    .then((res) => {
      dispatch({
        type: types.PATCH_USER_SUCCESS,
        payload: res.user,
      });
    })
    .catch((e) => _handleError(e, types.PATCH_USER_FAILED, dispatch, modifyUser()))
    .finally(() => dispatch(requestFinished()));
};

export const resetPassword = (data) => (dispatch) => {
  dispatch(requestStarted());
  api.resetPasswordRequest(data)
    .then(() => {
      dispatch({
        type: types.PASSWORD_RESET_SUCCESS,
        payload: data,
      });
    })
    .catch((e) => _handleError(e, types.PASSWORD_RESET_FAILED, dispatch))
    .finally(() => dispatch(requestFinished()));
};

export const confirmPasswordReset = (data) => (dispatch) => {
  dispatch(requestStarted());
  api.confirmPasswordResetRequest(data)
    .then((res) => dispatch({
      type: types.PASSWORD_RESET_CONFIRMATION_SUCCESS,
      payload: res,
    }))
    .catch((e) => _handleError(e, types.PASSWORD_RESET_CONFIRMATION_FAILED, dispatch))
    .finally(() => dispatch(requestFinished()));
};

export const getIngredients = () => async (dispatch) => {
  dispatch(requestStarted());
  await api.getIngredientsRequest()
    .then((res) => dispatch({
      type: types.REQUEST_INGREDIENTS_SUCCESS,
      payload: res.data,
    }))
    .catch((e) => _handleError(e, types.REQUEST_INGREDIENTS_FAILED, dispatch))
    .finally(() => dispatch(requestFinished()));
};

export const postOrder = (data) => async (dispatch) => {
  dispatch(requestStarted());
  await api.postOrderRequest(data)
    .then((res) => dispatch({
      type: types.POST_ORDER_SUCCESS,
      payload: res,
    }))
    .catch((e) => _handleError(e, types.POST_ORDER_FAILED, dispatch, postOrder()))
    .finally(() => dispatch(requestFinished()));
};
