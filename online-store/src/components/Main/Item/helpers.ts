import { IBicycle } from '../../../global/models';

export function getParametersItem(item: IBicycle) {
  const { brand, color, isPopular, name, price, quantity, speeds, weight } = item;

  return [
    { text: 'Название', value: name },
    { text: 'Брэнд', value: brand },
    { text: 'Цвет', value: color },
    { text: 'Количество скоростей', value: speeds },
    { text: 'Количество', value: quantity },
    { text: 'Вес', value: weight },
    { text: 'Цена', value: `${price}₽` },
    { text: 'Популярный', value: isPopular ? 'да' : 'нет' }
  ];
}
