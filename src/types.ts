export type TBunType = 'bun' | 'sauce' | 'main';
export type TProfileInputs = 'name' | 'email' | 'password';

export type TTabs = Array<{
  name: string;
  type: TBunType;
}>

export type TNutrients = Array<{
  id: string;
  name: string;
  value: number | 'n/a';
}>

export interface IIngredient {
  type: TBunType;
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
export interface IIngredientWithCount extends IIngredient {
  count: number;
}

export interface IOrder {
  number: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  price?: number;
  _id: string;
  status: string;
  ingredients: Array<string> | Array<IIngredient>;
  owner?: {
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
  }
}

export interface IOrderDoneResponse {
  success: true;
  name: string;
  order: IOrder;
}

export type TOrderStatus = {
  text: string | null;
  color: string | null;
};

export type TLocationTemplate = {
  from: {
    pathname: string;
  };
}

