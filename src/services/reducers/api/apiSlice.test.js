import reducer from './apiSlice';

const state = {
  apiRequestInProgress: false,
};

describe('api reducer', () => {
  it('should return init state by default', () => {
    expect(reducer(undefined, {})).toEqual(state);
  });
  it('should set apiRequestInProgress: true', () => {
    expect(reducer(state, { type: 'api/startRequest' }))
      .toStrictEqual({
        apiRequestInProgress: true,
      });
  });
  it('should set apiRequestInProgress: false', () => {
    expect(reducer(state, { type: 'api/finishRequest' }))
      .toStrictEqual({
        apiRequestInProgress: false,
      });
  });
});
