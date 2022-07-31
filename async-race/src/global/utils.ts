import { carBrands, carModels } from './constants';

export const getRandomNumberBetweeenTwoValues = (min: number, max: number): number => {
  const result = Math.floor(Math.random() * (max - min + 1)) + min;
  return result;
};

export const getRandomColor = (): string => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i += 1) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const generateRandomName = () => {
  const indexRandomBrand = getRandomNumberBetweeenTwoValues(0, carBrands.length);
  const randomBrand = carBrands[indexRandomBrand];
  const indexRandomfModal = getRandomNumberBetweeenTwoValues(0, carModels.length);
  const randomModel = carModels[indexRandomfModal];
  const resultedName = `${randomBrand} ${randomModel}`;
  return resultedName;
};
