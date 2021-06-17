import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import * as types from '../../utils/constants';
import {
  getIngredients, login, logout, register,
} from './auth';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mockData = {
  ingredients: [{ a: 'a' }, { b: 'b' }],
  user: { name: 'Joe Dow', email: 'joe@example.com' },
  error: 'что-то пошло не так при запросе на сервер: ',
};

describe('Test async auth thunks action creators', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('expected actions should be dispatched on successful getIngredients request', () => {
    fetchMock.get(`${types.API_URL}/ingredients`, {
      body: { data: mockData.ingredients, success: true },
      headers: { 'content-type': 'application/json' },
    });
    const expectedActions = [
      { type: types.API_REQUEST_IN_PROGRESS },
      { type: types.REQUEST_INGREDIENTS_SUCCESS, payload: mockData.ingredients },
      { type: types.API_REQUEST_FINISHED },
    ];
    const store = mockStore({});
    return store.dispatch(getIngredients()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('expected actions should be dispatched on successful register request', () => {
    fetchMock.post(`${types.API_URL}/auth/register`, {
      body: { user: mockData.user, success: true },
      headers: { 'content-type': 'application/json' },
    });
    const store = mockStore({});
    const expectedActions = [
      { type: types.API_REQUEST_IN_PROGRESS },
      { type: types.REGISTER_SUCCESS, payload: { ...mockData.user } },
      { type: types.API_REQUEST_FINISHED },
    ];

    return store.dispatch(register()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('expected actions should be dispatched on successful login request', () => {
    fetchMock.post(`${types.API_URL}/auth/login`, {
      body: { user: mockData.user, success: true },
      headers: { 'content-type': 'application/json' },
    });
    const store = mockStore({});
    const expectedActions = [
      { type: types.API_REQUEST_IN_PROGRESS },
      { type: types.LOGIN_SUCCESS, payload: { ...mockData.user } },
      { type: types.API_REQUEST_FINISHED },
    ];

    return store.dispatch(login()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('expected actions should be dispatched on successful logout request', () => {
    fetchMock.post(`${types.API_URL}/auth/logout`, {
      body: { success: true },
      headers: { 'content-type': 'application/json' },
    });
    const store = mockStore({});
    const expectedActions = [
      { type: types.API_REQUEST_IN_PROGRESS },
      { type: types.CLEAR_FORM_VALUES },
      { type: types.LOGOUT_SUCCESS },
      { type: types.API_REQUEST_FINISHED },
    ];

    return store.dispatch(logout()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('Test FAILED async auth thunks action creators', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  const requests = [
    {
      url: '/ingredients',
      method: 'GET',
      mainType: [{ type: types.REQUEST_INGREDIENTS_FAILED }],
      action: getIngredients,
    },
    {
      url: '/auth/register',
      method: 'POST',
      mainType: [{ type: types.REGISTER_FAILED }],
      action: register,
    },
    {
      url: '/auth/login',
      method: 'POST',
      mainType: [{ type: types.LOGIN_FAILED }],
      action: login,
    },
  ];

  requests.forEach((request) => {
    it(`expected actions should be dispatched on failed ${request.url} request`, () => {
      fetchMock.mock(`${types.API_URL}${request.url}`, {
        body: { success: false, message: undefined },
        headers: { 'content-type': 'application/json' },
        method: request.method,
      });
      const expectedActions = [
        { type: types.API_REQUEST_IN_PROGRESS },
        ...request.mainType,
        { type: types.SET_CURRENT_ERROR, payload: `${mockData.error}${undefined}` },
        { type: types.API_REQUEST_FINISHED },
      ];
      const store = mockStore({});
      return store.dispatch(request.action()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});
