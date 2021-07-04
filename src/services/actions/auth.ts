import api from '../../utils/api';
import { setCookie, deleteCookie } from '../../utils/common';
import { startRequest, finishRequest } from '../reducers/api/apiSlice';
import { setCurrentError, setIngredients } from '../reducers/content/contentSlice';
import {
  resetPasswordReducer, confirmPasswordResetReducer, setUser, signout,
} from '../reducers/user/userSlice';
import { clearForms } from '../reducers/form/formSlice';
import { setCurrentOrder } from '../reducers/cart/cartSlice';
import { AppDispatch, AppThunk } from '../../store';
import { 
  TRegisterRequest,
  TLoginRequest,
  TConfirmPasswordRequest,
  TPatchUserRequest,
  TPostOrderRequest,
  TResetPasswordRequest
} from '../../utils/api'

const _setTokens = (res: {
  accessToken: string; refreshToken: string
}) => {
  const { accessToken, refreshToken } = res;
  const authToken = accessToken?.split('Bearer ')[1];
  if (authToken) setCookie('token', authToken);
  if (refreshToken) localStorage.setItem('refreshToken', refreshToken);
};

const _clearTokens = () => {
  localStorage.removeItem('refreshToken');
  deleteCookie('token');
};

const _refreshToken = (afterRefreshFunc: any) => (dispatch: AppDispatch) => {
  api.refreshTokenRequest()
    .then((res) => {
      _setTokens(res);
      dispatch(afterRefreshFunc);
    })
    .catch((e) => dispatch(setCurrentError(e.message)));
};

const _handleError = (e: {message: string }, dispatch: AppDispatch, func?: any) => {
  if ((e.message === 'jwt expired' || e.message === 'jwt malformed') && func) {
    dispatch(_refreshToken(func));
  } else {
    dispatch(setCurrentError(e.message));
  }
};

export const register = (data: TRegisterRequest): AppThunk => async (dispatch: AppDispatch) => {
  dispatch(startRequest());
  await api.registerRequest(data)
    .then((res) => {
      _setTokens(res);
      dispatch(setUser(res.user));
    })
    .catch((e) => _handleError(e, dispatch))
    .finally(() => dispatch(finishRequest()));
};

export const login = (data: TLoginRequest): AppThunk => async (dispatch: AppDispatch) => {
  dispatch(startRequest());
  await api.loginRequest(data)
    .then((res) => {
      _setTokens(res);
      dispatch(setUser(res.user));
    })
    .catch((e) => _handleError(e, dispatch))
    .finally(() => dispatch(finishRequest()));
};

export const logout = (): AppThunk => async (dispatch: AppDispatch) => {
  dispatch(startRequest());
  await api.logoutRequest()
    .then((res) => {
      _clearTokens();
      // eslint-disable-next-line no-console
      console.log(res.message);
      dispatch(signout());
      dispatch(clearForms());
    })
    .catch((e) => _handleError(e, dispatch))
    .finally(() => dispatch(finishRequest()));
};

export const getUser = (): AppThunk => async (dispatch: AppDispatch) => {
  if (!localStorage.getItem('refreshToken')) return;
  dispatch(startRequest());
  await api.getUserRequest()
    .then((res) => dispatch(setUser(res.user)))
    .catch((e) => _handleError(e, dispatch, getUser()))
    .finally(() => dispatch(finishRequest()));
};

export const modifyUser = (data: TPatchUserRequest): AppThunk => async (dispatch: AppDispatch) => {
  dispatch(startRequest());
  await api.patchUserRequest(data)
    .then((res) => dispatch(setUser(res.user)))
    .catch((e) => _handleError(e, dispatch, modifyUser))
    .finally(() => dispatch(finishRequest()));
};

export const resetPassword = (data: TResetPasswordRequest): AppThunk => async (dispatch: AppDispatch) => {
  dispatch(startRequest());
  await api.resetPasswordRequest(data)
    .then(() => dispatch(resetPasswordReducer()))
    .catch((e) => _handleError(e, dispatch))
    .finally(() => dispatch(finishRequest()));
};

export const confirmPasswordReset = (data: TConfirmPasswordRequest): AppThunk => async (dispatch: AppDispatch) => {
  dispatch(startRequest());
  await api.confirmPasswordResetRequest(data)
    .then(() => dispatch(confirmPasswordResetReducer()))
    .catch((e) => _handleError(e, dispatch))
    .finally(() => dispatch(finishRequest()));
};

export const getIngredients = (): AppThunk => async (dispatch: AppDispatch) => {
  dispatch(startRequest());
  await api.getIngredientsRequest()
    .then((res) => dispatch(setIngredients(res.data)))
    .catch((e) => _handleError(e, dispatch))
    .finally(() => dispatch(finishRequest()));
};

export const postOrder = (data: TPostOrderRequest): AppThunk => async (dispatch: AppDispatch) => {
  dispatch(startRequest());
  await api.postOrderRequest(data)
    .then((res) => dispatch(setCurrentOrder(res)))
    .catch((e) => _handleError(e, dispatch, postOrder))
    .finally(() => dispatch(finishRequest()));
};
