export const getNearestTab = () => {
  const [container, bunsList, saucesList, mainsList] = ['ingredients', 'bun', 'sauce', 'main'].map(type => document.getElementById(type));

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
        : 'bun'

  return calculatedNearestTab
}

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
}

const daysAgoToString = days => days < 0 
  ? 'Это случится в будущем'
  : days === 0
  ? 'Сегодня'
  :  days === 1
  ? 'Вчера'
  : days > 1
  ? `${days} дня(-ей) назад`
  :'Ошибка в вычислении времени'

export const orderDateAgoToString = (date1, date2 = new Date()) => {
  date2.setHours(0);
  date2.setMinutes(0);
  date2.setSeconds(0);

  const daysAgo = Math.ceil((date2 - date1) / (60 * 60 * 24 * 1000));

  const days = daysAgoToString(daysAgo);
  const hours = date1.getHours();
  const minutes = date1.getMinutes();
  const timeShift = `i-GMT${date1.getTimezoneOffset() / 60}`

  return `${days}, ${hours}:${minutes} ${timeShift}`
}