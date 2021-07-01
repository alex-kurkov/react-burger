import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import { API_URL } from '../../utils/constants';
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
    fetchMock.get(`${API_URL}/ingredients`, {
      body: { data: mockData.ingredients, success: true },
      headers: { 'content-type': 'application/json' },
    });
    const expectedActions = [
      { type: 'api/startRequest', payload: undefined },
      { type: 'content/setIngredients', payload: mockData.ingredients },
      { type: 'api/finishRequest', payload: undefined },
    ];
    const store = mockStore({});
    return store.dispatch(getIngredients()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('expected actions should be dispatched on successful register request', () => {
    fetchMock.post(`${API_URL}/auth/register`, {
      body: { user: mockData.user, success: true },
      headers: { 'content-type': 'application/json' },
    });
    const store = mockStore({});
    const expectedActions = [
      { type: 'api/startRequest', payload: undefined },
      { type: 'user/setUser', payload: { ...mockData.user } },
      { type: 'api/finishRequest', payload: undefined },
    ];

    return store.dispatch(register()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('expected actions should be dispatched on successful login request', () => {
    fetchMock.post(`${API_URL}/auth/login`, {
      body: { user: mockData.user, success: true },
      headers: { 'content-type': 'application/json' },
    });
    const store = mockStore({});
    const expectedActions = [
      { type: 'api/startRequest', payload: undefined },
      { type: 'user/setUser', payload: { ...mockData.user } },
      { type: 'api/finishRequest', payload: undefined },
    ];

    return store.dispatch(login()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('expected actions should be dispatched on successful logout request', () => {
    fetchMock.post(`${API_URL}/auth/logout`, {
      body: { success: true },
      headers: { 'content-type': 'application/json' },
    });
    const store = mockStore({});
    const expectedActions = [
      { type: 'api/startRequest', payload: undefined },
      { type: 'user/signout', payload: undefined },
      { type: 'form/clearForms', payload: undefined },
      { type: 'api/finishRequest', payload: undefined },
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
      action: getIngredients,
    },
    {
      url: '/auth/register',
      method: 'POST',
      action: register,
    },
    {
      url: '/auth/login',
      method: 'POST',
      action: login,
    },
  ];

  requests.forEach((request) => {
    it(`expected actions should be dispatched on failed ${request.url} request`, () => {
      fetchMock.mock(`${API_URL}${request.url}`, {
        body: { success: false, message: undefined },
        headers: { 'content-type': 'application/json' },
        method: request.method,
      });
      const expectedActions = [
        { type: 'api/startRequest', payload: undefined },
        { type: 'content/setCurrentError', payload: undefined },
        { type: 'api/finishRequest', payload: undefined },
      ];
      const store = mockStore({});
      return store.dispatch(request.action()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});
