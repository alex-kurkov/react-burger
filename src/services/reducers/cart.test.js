/* eslint-disable no-unused-vars */
import {
  ADD_CHOSEN_INGREDIENT,
  ADD_CHOSEN_BUN,
  REMOVE_CHOSEN_INGREDIENT,
  ELEMENT_SORTED_BY_DND,
  RESET_CHOSEN_INGREDIENTS,
} from '../../utils/constants';
import reducer from './cart';

const state = {
  chosenIngredients: [],
  chosenBun: {},
};

const mockIngredients = [1, 3, 'eded', undefined];
const mockBun = { bun: true };

describe('cart reducer', () => {
  it('should return init state by default', () => {
    expect(reducer(undefined, {})).toEqual(state);
  });
  it('should set chosenIngredients', () => {
    expect(reducer(state, { type: ADD_CHOSEN_INGREDIENT, payload: mockIngredients }))
      .toEqual(
        expect.objectContaining({
          chosenIngredients: expect.arrayContaining([...mockIngredients]),
        }),
      );
  });
  it('should set chosenBun', () => {
    expect(reducer(state, { type: ADD_CHOSEN_BUN, payload: mockBun }))
      .toEqual(
        expect.objectContaining({
          chosenBun: expect.objectContaining({ bun: true }),
        }),
      );
  });
  it('should reset ingredients', () => {
    expect(reducer({
      chosenIngredients: mockIngredients,
      chosenBun: mockIngredients,
    }, { type: RESET_CHOSEN_INGREDIENTS }))
      .toStrictEqual(state);
  });
  it('should remove ingredient', () => {
    expect(reducer({
      chosenIngredients: mockIngredients,
    }, { type: REMOVE_CHOSEN_INGREDIENT, payload: { positionIndex: 2 } }))
      .toEqual({ chosenIngredients: expect.not.arrayContaining(['eded']) });
  });
  it('should sort ingredients', () => {
    expect(reducer({ chosenIngredients: mockIngredients }, {
      type: ELEMENT_SORTED_BY_DND,
      payload: { positionIndex: 3, targetIndex: 0 },
    }))
      .toStrictEqual({ chosenIngredients: [undefined, 1, 3, 'eded'] });
  });
});
