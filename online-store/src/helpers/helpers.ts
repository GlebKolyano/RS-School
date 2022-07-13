import DATA from '../data/data';

export function getMinMaxValues() {
  const bicycles = DATA;
  const minQuantity = bicycles.reduce(
    (res, item) => (res > item.quantity ? item.quantity : res),
    Infinity
  );
  const maxQuantity = bicycles.reduce(
    (res, item) => (res < item.quantity ? item.quantity : res),
    0
  );
  const minPrice = bicycles.reduce((res, item) => (res > item.price ? item.price : res), Infinity);
  const maxPrice = bicycles.reduce((res, item) => (res < item.price ? item.price : res), 0);

  return { minQuantity, maxQuantity, minPrice, maxPrice };
}
