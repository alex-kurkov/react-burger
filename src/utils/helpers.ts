import { templateIngredient } from './data';
import { CREATED, PENDING, DONE } from './constants';
import { IIngredient, TBunType, TOrderStatus, IIngredientWithCount } from '../types';

export const getNearestTab = (): TBunType => {
  const [container, bunsList, saucesList, mainsList]: Array<HTMLElement | null> = ['ingredients', 'bun', 'sauce', 'main'].map((type) => document.getElementById(type));

  if (!container || !bunsList || !saucesList || !mainsList) return 'bun';

  const containerY: number = container.getBoundingClientRect().y;
  const bunsListY: number = bunsList.getBoundingClientRect().y;
  const saucesListY: number = saucesList.getBoundingClientRect().y;
  const mainsListY: number = mainsList.getBoundingClientRect().y;

  const bunsDelta: number = Math.abs(containerY - bunsListY);
  const saucesDelta: number = Math.abs(containerY - saucesListY);
  const mainsDelta: number = Math.abs(containerY - mainsListY);

  const calculatedSmallestDelta: number = Math.min(bunsDelta, saucesDelta, mainsDelta);
  const calculatedNearestTab: TBunType = calculatedSmallestDelta === bunsDelta
    ? 'bun'
    : calculatedSmallestDelta === saucesDelta
      ? 'sauce'
      : calculatedSmallestDelta === mainsDelta
        ? 'main'
        : 'bun';

  return calculatedNearestTab;
};

export const throttle = (callback: () => any, limit: number) => {
  let waiting: boolean = false;
  return () => {
    if (!waiting) {
      callback.apply(this);
      waiting = true;
      setTimeout(() => {
        waiting = false;
      }, limit);
    }
  };
};

const daysAgoToString = (days: number): string => (
  days < 0
  ? 'Это случится в будущем'
  : days === 0
    ? 'Сегодня'
    : days === 1
      ? 'Вчера'
      : days > 1
        ? `${days} дня(-ей) назад`
        : 'Ошибка в вычислении времени'
);

export const orderDateAgoToString = (date: string): string => {
  const ago: Date = new Date(date);
  const today: Date = new Date();
  today.setHours(0);
  today.setMinutes(0);
  today.setSeconds(0);

  const daysAgo: number = Math.ceil((today.getTime() - ago.getTime()) / (60 * 60 * 24 * 1000));

  const days = daysAgoToString(daysAgo);
  const hours = ago.getHours().toString();
  const minutes = ago.getMinutes().toString().padStart(2, '0');
  const timeShift = `i-GMT${ago.getTimezoneOffset() / 60}`;

  return `${days}, ${hours}:${minutes} ${timeShift}`;
};
export const populateIngredients = (ingredients: string[] | IIngredient[], sourceArray: IIngredient[]): IIngredient[] => 
  ingredients.map((id: string | IIngredient) => {
    const ingredient = sourceArray.find((item) => item._id === id);
    if (ingredient) return ingredient;
    return templateIngredient;
});

export const countIngredients = (ingredients: IIngredient[]): IIngredientWithCount[] => ingredients
  .map(item => ({...item, count: 1}))
  .reduce((acc: IIngredientWithCount[], item: IIngredientWithCount) => {
    const currentItemIndexInAcc = acc.findIndex((i) => i._id === item._id);
    if (currentItemIndexInAcc < 0) {
      return [...acc, item ]
    } else {
      acc[currentItemIndexInAcc].count += 1;
      return acc;
    }
  }, [])

export const countCost = (ingredients: IIngredient[]): number => ingredients
  .reduce((acc, item) => {
    if (item.type === 'bun') {
      acc += (item.price * 2);
    } else {
      acc += item.price;
    }
    return acc;
  }, 0);

export const getStatus = (status: string): TOrderStatus => (status === CREATED
  ? { text: 'создан', color: 'red' }
  : status === PENDING
    ? { text: 'готовится', color: 'green' }
    : status === DONE
      ? { text: 'выполнен', color: 'white' }
      : { text: null, color: null });
