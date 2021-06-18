import reducer from './orderSlice';

const state = {
  currentOrder: {},
};

describe('order reducer', () => {
  it('should return init state by default', () => {
    expect(reducer(undefined, {})).toEqual(state);
  });
  it('should set current order', () => {
    expect(reducer(state, { type: 'order/setCurrentOrder', payload: 'mock' }))
      .toStrictEqual({ currentOrder: 'mock' });
  });
  it('should reset current order', () => {
    expect(reducer({ currentOrder: 'exists' }, { type: 'order/resetCurrentOrder' }))
      .toStrictEqual(state);
  });
});
