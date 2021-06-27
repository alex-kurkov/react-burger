import { templateIngredient } from './data';
import { CANCELLED, IN_PROGRESS, COMPLETED } from './constants';
/* eslint-disable no-unreachable */
export const getNearestTab = () => {
  const [container, bunsList, saucesList, mainsList] = ['ingredients', 'bun', 'sauce', 'main'].map((type) => document.getElementById(type));

  const containerY = container.getBoundingClientRect().y;
  const bunsListY = bunsList.getBoundingClientRect().y;
  const saucesListY = saucesList.getBoundingClientRect().y;
  const mainsListY = mainsList.getBoundingClientRect().y;

  const bunsDelta = Math.abs(containerY - bunsListY);
  const saucesDelta = Math.abs(containerY - saucesListY);
  const mainsDelta = Math.abs(containerY - mainsListY);

  const calculatedSmallestDelta = Math.min(bunsDelta, saucesDelta, mainsDelta);
  const calculatedNearestTab = calculatedSmallestDelta === bunsDelta
    ? 'bun'
    : calculatedSmallestDelta === saucesDelta
      ? 'sauce'
      : calculatedSmallestDelta === mainsDelta
        ? 'main'
        : 'bun';

  return calculatedNearestTab;
};

export const throttle = (callback, limit) => {
  let waiting = false;
  return (...rest) => {
    if (!waiting) {
      callback.apply(this, rest);
      waiting = true;
      setTimeout(() => {
        waiting = false;
      }, limit);
    }
  };
};

const daysAgoToString = (days) => (days < 0
  ? 'Это случится в будущем'
  : days === 0
    ? 'Сегодня'
    : days === 1
      ? 'Вчера'
      : days > 1
        ? `${days} дня(-ей) назад`
        : 'Ошибка в вычислении времени');

export const orderDateAgoToString = (date) => {
  const ago = new Date(date);
  const today = new Date();
  today.setHours(0);
  today.setMinutes(0);
  today.setSeconds(0);

  const daysAgo = Math.ceil((today - ago) / (60 * 60 * 24 * 1000));

  const days = daysAgoToString(daysAgo);
  const hours = ago.getHours();
  const minutes = ago.getMinutes();
  const timeShift = `i-GMT${ago.getTimezoneOffset() / 60}`;

  return `${days}, ${hours}:${minutes} ${timeShift}`;
};
export const populateIngredients = (ingredients, sourceArray) => ingredients.map((id) => {
  const ingredient = sourceArray.find((item) => item._id === id);
  if (ingredient) return ingredient;
  return templateIngredient;
});

export const countIngredients = (ingredients) => ingredients
  .reduce((acc, item) => {
    const currentItemIndexInAcc = acc.findIndex((i) => i._id === item._id);

    if (currentItemIndexInAcc < 0) return [...acc, { count: 1, ...item }];

    acc[currentItemIndexInAcc].count += 1;

    return acc;
  }, []);

export const countCost = (ingredients) => ingredients
  .reduce((acc, item) => {
    if (item.type === 'bun') {
      acc += (item.price * 2);
    } else {
      acc += item.price;
    }
    return acc;
  }, 0);

export const getStatus = (status) => (status === CANCELLED
  ? { text: 'отменен', color: 'red' }
  : status === IN_PROGRESS
    ? { text: 'готовится', color: 'green' }
    : status === COMPLETED
      ? { text: 'выполнен', color: 'white' }
      : { text: null, color: null });
