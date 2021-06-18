import * as types from '../../utils/constants';
import api from '../../utils/api';
import { setCookie, deleteCookie } from '../../utils/common';
import { startRequest, finishRequest } from '../../features/api/apiSlice';
import { setCurrentError, setIngredients } from '../../features/content/contentSlice';
import { setUser } from '../../features/user/userSlice';

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
const _handleError = (e, dispatch, func) => {
  if ((e.message === 'jwt expired' || e.message === 'jwt malformed') && func) {
    dispatch(_refreshToken(func));
  } else {
    dispatch(setCurrentError(`что-то пошло не так при запросе на сервер: ${e.message}`));
  }
};

export const register = (data) => async (dispatch) => {
  dispatch(startRequest());
  await api.registerRequest(data)
    .then((res) => {
      _setTokens(res);
      dispatch({
        type: types.REGISTER_SUCCESS,
        payload: res.user,
      });
    })
    .catch((e) => _handleError(e, dispatch))
    .finally(() => dispatch(finishRequest()));
};

export const login = (data) => async (dispatch) => {
  dispatch(startRequest());
  await api.loginRequest(data)
    .then((res) => {
      _setTokens(res);
      dispatch(setUser({ payload: res.user }));
    })
    .catch((e) => _handleError(e, dispatch))
    .finally(() => dispatch(finishRequest()));
};

export const logout = () => async (dispatch) => {
  dispatch(startRequest());
  await api.logoutRequest()
    .then((res) => {
      _clearTokens();
      // eslint-disable-next-line no-console
      console.log(res.message);
      dispatch({ type: types.CLEAR_FORM_VALUES });
      dispatch(logout());
    })
    .catch((e) => _handleError(e, dispatch))
    .finally(() => dispatch(finishRequest()));
};

export const getUser = () => async (dispatch) => {
  if (!localStorage.getItem('refreshToken')) return;
  dispatch(startRequest());
  await api.getUserRequest()
    .then((res) => dispatch(setUser({ payload: res.user })))
    .catch((e) => _handleError(e, dispatch, getUser()))
    .finally(() => dispatch(finishRequest()));
};

export const modifyUser = (data) => async (dispatch) => {
  dispatch(startRequest());
  await api.patchUserRequest(data)
    .then((res) => dispatch(setUser({ payload: res.user })))
    .catch((e) => _handleError(e, dispatch, modifyUser()))
    .finally(() => dispatch(finishRequest()));
};

export const resetPassword = (data) => async (dispatch) => {
  dispatch(startRequest());
  await api.resetPasswordRequest(data)
    .then(() => dispatch(resetPassword))
    .catch((e) => _handleError(e, dispatch))
    .finally(() => dispatch(finishRequest()));
};

export const confirmPasswordReset = (data) => async (dispatch) => {
  dispatch(startRequest());
  await api.confirmPasswordResetRequest(data)
    .then(() => dispatch(confirmPasswordReset))
    .catch((e) => _handleError(e, dispatch))
    .finally(() => dispatch(finishRequest()));
};

export const getIngredients = () => async (dispatch) => {
  dispatch(startRequest());
  await api.getIngredientsRequest()
    .then((res) => dispatch(setIngredients(res.data)))
    .catch((e) => _handleError(e, dispatch))
    .finally(() => dispatch(finishRequest()));
};

export const postOrder = (data) => async (dispatch) => {
  dispatch(startRequest());
  await api.postOrderRequest(data)
    .then((res) => dispatch({
      type: types.POST_ORDER_SUCCESS,
      payload: res,
    }))
    .catch((e) => _handleError(e, dispatch, postOrder()))
    .finally(() => dispatch(finishRequest()));
};
