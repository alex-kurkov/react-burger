import store from './store';
export type RootState = ReturnType<typeof store.getState>;

export type TBunType = 'bun' | 'sauce' | 'main';
export type TProfileInputs = 'name' | 'email' | 'password';

export type TApiState = {
  apiRequestInProgress: boolean;
}
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

export interface IStore {
  cart: {
    chosenIngredients: Array<IIngredient>;
    chosenBun: IIngredient;
    currentOrder: {
      success: boolean;
      name: string;
      order: IOrder;
    }
  };
  api: {
    apiRequestInProgress: boolean;
  };
  content: {
    ingredients: Array<IIngredient>,
    hasError: boolean,
    errors: Array<string>,
    currentError: string,
    orders: Array<any>,
    socketConnected: boolean,
    total: number | null,
    totalToday: null | number,
  };
  user: {
    passwordReset: boolean;
    passwordResetSuccess: boolean;
    email: string;
    loggedIn: boolean;
    name: string;
    userOrders: IOrder[];
    socketConnected: boolean;
    total: null | number;
    totalToday: null | number;
  };
  form: {
    login: {
      email: string;
      password: string;
    },
    register: {
      name: string;
      email: string;
      password: string;
    },
    forgot: {
      email: string;
    },
    reset: {
      password: string;
      code: string;
    },
  }
}

export type TOrderStatus = {
  text: string | null;
  color: string | null;
};

export type TLocationState = {
  from: {
    pathname: string;
  };
}