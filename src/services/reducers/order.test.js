import {
  POST_ORDER_SUCCESS,
  POST_ORDER_FAILED,
  RESET_CURRENT_ORDER,
} from '../../utils/constants';
import reducer from './order';

const state = {
  currentOrder: {},
};

describe('order reducer', () => {
  it('should return init state by default', () => {
    expect(reducer(undefined, {})).toEqual(state);
  });
  it('should set current order', () => {
    expect(reducer(state, { type: POST_ORDER_SUCCESS, payload: 'mock' }))
      .toStrictEqual({ currentOrder: 'mock' });
  });
  it('should clear current order if post failed', () => {
    expect(reducer({ currentOrder: { it: 'exists' } }, { type: POST_ORDER_FAILED, payload: 'mock' }))
      .toStrictEqual(state);
  });
  it('should reset current order', () => {
    expect(reducer({ currentOrder: 'exists' }, { type: RESET_CURRENT_ORDER }))
      .toStrictEqual(state);
  });
});
