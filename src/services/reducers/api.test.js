import {
  API_REQUEST_IN_PROGRESS,
  API_REQUEST_FINISHED,
} from '../../utils/constants';
import reducer from './api';

const state = {
  apiRequestInProgress: false,
};

describe('api reducer', () => {
  it('should return init state by default', () => {
    expect(reducer(undefined, {})).toEqual(state);
  });
  it('should set apiRequestInProgress: true', () => {
    expect(reducer(state, { type: API_REQUEST_IN_PROGRESS }))
      .toStrictEqual({
        apiRequestInProgress: true,
      });
  });
  it('should set apiRequestInProgress: false', () => {
    expect(reducer(state, { type: API_REQUEST_FINISHED }))
      .toStrictEqual({
        apiRequestInProgress: false,
      });
  });
});
