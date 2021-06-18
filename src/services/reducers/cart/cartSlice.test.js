import reducer from './cartSlice';

const state = {
  chosenIngredients: [],
  chosenBun: {},
  currentOrder: {},
};

const mockIngredients = [1, 3, 'eded', undefined];
const mockBun = { bun: true };

describe('cart reducer', () => {
  it('should return init state by default', () => {
    expect(reducer(undefined, {})).toEqual(state);
  });
  it('should set chosenIngredients', () => {
    expect(reducer(state, { type: 'cart/addIngredient', payload: mockIngredients }))
      .toEqual(
        expect.objectContaining({
          chosenIngredients: expect.arrayContaining([...mockIngredients]),
        }),
      );
  });
  it('should set chosenBun', () => {
    expect(reducer(state, { type: 'cart/addBun', payload: mockBun }))
      .toEqual(
        expect.objectContaining({
          chosenBun: expect.objectContaining({ bun: true }),
        }),
      );
  });
  it('should set current order', () => {
    expect(reducer(state, { type: 'cart/setCurrentOrder', payload: 'mock' }))
      .toEqual(expect.objectContaining({ currentOrder: 'mock' }));
  });
  it('should reset current order', () => {
    expect(reducer({ currentOrder: 'exists' }, { type: 'cart/resetCurrentOrder' }))
      .toEqual(state);
  });
  it('should reset ingredients', () => {
    expect(reducer({
      chosenIngredients: mockIngredients,
      chosenBun: mockIngredients,
      currentOrder: {},
    }, { type: 'cart/resetIngredients' }))
      .toStrictEqual(state);
  });
  it('should remove ingredient', () => {
    expect(reducer({
      chosenIngredients: mockIngredients,
    }, { type: 'cart/removeIngredient', payload: { positionIndex: 2 } }))
      .toEqual({ chosenIngredients: expect.not.arrayContaining(['eded']) });
  });
  it('should sort ingredients', () => {
    expect(reducer({ chosenIngredients: mockIngredients }, {
      type: 'cart/sortIngredients',
      payload: { positionIndex: 3, targetIndex: 0 },
    }))
      .toStrictEqual({ chosenIngredients: [undefined, 1, 3, 'eded'] });
  });
});
