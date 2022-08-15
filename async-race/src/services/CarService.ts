import { get } from '../global/helpers';
import { ICar, URL } from '../global/models';

export default class CarService {
  public static getCar = async (idCar: number): Promise<ICar> => {
    const { data } = await get<ICar>(`${URL.garage}/${idCar}`).catch(() => {
      throw new Error("You can't get this car!");
    });

    return data;
  };
}
