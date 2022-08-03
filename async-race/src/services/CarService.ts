import { ICar, URL } from '../global/models';

export default class CarService {
  public static getCar = async (idCar: number) => {
    const response = await fetch(`${URL.garage}/${idCar}`);

    if (!response.ok) {
      throw new Error("You can't get this car!");
    }

    const car = response.json() as unknown as ICar;
    return car;
  };
}
