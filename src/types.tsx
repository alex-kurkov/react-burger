export interface IIngredient {
  type: 'bun' | 'sauce' | 'main';
  _id: string;
  name: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  description?: string;
  __v: number;
}

export interface IStore {
  cart: {
    chosenIngredients: Array<IIngredient>;
    chosenBun: IIngredient
  };
}
