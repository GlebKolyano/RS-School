import EngineService from '../services/EngineService';
import { ICar, IEngineParams } from '../global/models';

const animations: { [index: number]: number } = {};

async function animateCar(id: number, car: HTMLElement, finish: HTMLElement, duration: number) {
  const animatedCar = car;
  let currentPositionOfCar = animatedCar.offsetLeft - animatedCar.offsetWidth + 20;

  const finalPosition = finish.offsetLeft - finish.offsetWidth * 2;
  const framesCount = (duration / 1000) * 60;
  const dx = (finalPosition - animatedCar.offsetLeft) / framesCount;

  const tick = () => {
    currentPositionOfCar += dx;
    animatedCar.style.transform = `translateX(${currentPositionOfCar}px)`;

    if (currentPositionOfCar < finalPosition) {
      animations[id] = requestAnimationFrame(tick);
    }
  };

  tick();

  const isFinishedCar = await EngineService.engineDriveMode(id).catch(() => {
    cancelAnimationFrame(animations[id]);
    return false;
  });

  return isFinishedCar;
}

export async function startAnimationCar(car: ICar) {
  const { id, name } = car;

  const { distance, velocity } = (await EngineService.engineStart(id)) as IEngineParams;

  const speed = distance / velocity;

  const carModel = document.querySelector(`.car__image[data-id="${id}"]`) as HTMLElement;

  const finishModel = document.querySelector(`.car__finish[data-id="${id}"]`) as HTMLElement;

  const startTime = Date.now() / 1000;

  const resultRace = await animateCar(id, carModel, finishModel, speed);

  const finishTime = Date.now() / 1000;

  const finalTime = Number((finishTime - startTime).toFixed(2));

  return resultRace ? { name, id, finalTime } : Promise.reject();
}

export async function stopAnimationCar(id: number) {
  const car = document.querySelector(`.car__image[data-id="${id}"]`) as HTMLElement;

  await EngineService.engineStop(id);
  cancelAnimationFrame(animations[id]);
  car.style.transform = 'none';
}
