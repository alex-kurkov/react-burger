import {
  SET_CURRENT_ERROR,
  RESET_CURRENT_ERROR,
} from '../../utils/constants';
import reducer from './error';

const state = {
  hasError: false,
  errors: [],
  currentError: '',
};
const mockError = 'some critical error';

describe('error reducer', () => {
  it('should return init state by default', () => {
    expect(reducer(undefined, {})).toEqual(state);
  });
  it('should set error', () => {
    expect(reducer(state, { type: SET_CURRENT_ERROR, payload: mockError }))
      .toEqual(
        expect.objectContaining({
          errors: expect.arrayContaining([mockError]),
          hasError: true,
          currentError: mockError,
        }),
      );
  });
  it('should reset error', () => {
    expect(reducer({ hasError: true, errors: ['firstErr', 'exists'], currentError: 'exists' }, { type: RESET_CURRENT_ERROR }))
      .toEqual({ hasError: false, errors: ['firstErr', 'exists'], currentError: '' });
  });
});
