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
