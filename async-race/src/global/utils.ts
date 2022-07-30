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
