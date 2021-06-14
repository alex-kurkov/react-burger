import {
  REQUEST_INGREDIENTS_SUCCESS,
  REQUEST_INGREDIENTS_FAILED,
  CHANGE_INGREDIENTS_TAB,
} from '../../utils/constants';
import reducer from './content';

const state = {
  ingredients: [],
  currentIngredientsTab: 'bun',
};
const mockIngredients = [1, 3, 'eded', undefined];

describe('content reducer', () => {
  it('should return init state by default', () => {
    expect(reducer(undefined, {})).toEqual(state);
  });
  it('should set ingredients', () => {
    expect(reducer(undefined, { type: REQUEST_INGREDIENTS_SUCCESS, payload: mockIngredients }))
      .toEqual(
        expect.objectContaining({
          ingredients: expect.arrayContaining([...mockIngredients]),
        }),
      );
  });
  it('should reset ingredients', () => {
    expect(reducer(state, { type: REQUEST_INGREDIENTS_FAILED }))
      .toEqual({
        ingredients: [],
        currentIngredientsTab: 'bun',
      });
  });
  it('should change tab', () => {
    expect(reducer({
      chosenIngredients: mockIngredients,
    }, { type: CHANGE_INGREDIENTS_TAB, payload: 'sauce' }))
      .toEqual(expect.objectContaining({ currentIngredientsTab: 'sauce' }));
  });
});
