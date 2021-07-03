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

export type TApiState = {
  readonly apiRequestInProgress: boolean;
};
export type TCartState = {
  readonly chosenIngredients: Array<IIngredient>;
  readonly chosenBun?: IIngredient;
  readonly currentOrder?: {
    readonly success: boolean;
    readonly name: string;
    readonly order: IOrder;
  };
};
export type TContentState = {
  readonly ingredients: Array<IIngredient>,
  readonly hasError: boolean,
  readonly errors: Array<string>,
  readonly currentError: string | null,
  readonly orders: Array<IOrder>,
  readonly socketConnected: boolean,
  readonly total: number | null,
  readonly totalToday: null | number,
};
export type TUserState = {
  readonly passwordReset: boolean;
  readonly passwordResetSuccess: boolean;
  readonly email: string;
  readonly loggedIn: boolean;
  readonly name: string;
  readonly userOrders: IOrder[];
  readonly socketConnected: boolean;
  readonly total: null | number;
  readonly totalToday: null | number;
};
export type TFormState = {
  login: {
    readonly email: string;
    readonly password: string;
  },
  register: {
    readonly name: string;
    readonly email: string;
    readonly password: string;
  },
  forgot: {
    readonly email: string;
  },
  reset: {
    readonly password: string;
    readonly code: string;
  },
};

export type TOrderStatus = {
  text: string | null;
  color: string | null;
};

export type TLocationTemplate = {
  from: {
    pathname: string;
  };
}
