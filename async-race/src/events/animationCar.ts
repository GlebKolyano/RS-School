import EngineService from '../services/EngineService';
import { IEngineParams } from '../global/models';

const animations: { [index: number]: number } = {};

async function animateCar(id: number, car: HTMLElement, finish: HTMLElement, duration: number) {
  const animatedCar = car;
  let currentPositionOfCar = animatedCar.offsetLeft - 60;

  const finalPostion = finish.offsetLeft - 60;
  const framesCount = (duration / 1000) * 60;
  const dx = (finalPostion - animatedCar.offsetLeft) / framesCount;

  let isFinishedCar = false;

  const tick = () => {
    currentPositionOfCar += dx;
    animatedCar.style.transform = `translateX(${currentPositionOfCar}px)`;

    if (currentPositionOfCar < finalPostion) {
      animations[id] = requestAnimationFrame(tick);
    } else {
      isFinishedCar = true;
    }
  };

  tick();

  await EngineService.engineDriveMode(id).catch(() => {
    cancelAnimationFrame(animations[id]);
    isFinishedCar = false;
  });

  return isFinishedCar;
}

export async function startAnimationCar(id: number) {
  const { distance, velocity } = (await EngineService.engineStart(id)) as IEngineParams;
  const speed = distance / velocity;

  const car = document.querySelector(`.car__image[data-id="${id}"]`) as HTMLElement;
  const finish = document.querySelector(`.car__finish[data-id="${id}"]`) as HTMLElement;

  const startAnimationButton = document.querySelector(
    `.car__button-start[data-id="${id}"]`
  ) as HTMLButtonElement;
  const stopAnimationButton = document.querySelector(
    `.car__button-stop[data-id="${id}"]`
  ) as HTMLButtonElement;

  startAnimationButton.disabled = true;
  stopAnimationButton.disabled = false;

  const startTime = Date.now() / 1000;

  const resultRace = await animateCar(id, car, finish, speed);

  const finishTime = Date.now() / 1000;

  const finishingTime = Number((finishTime - startTime).toFixed(2));

  return resultRace ? { id, finishingTime } : Promise.reject();
}

export async function stopAnimationCar(id: number) {
  const car = document.querySelector(`.car__image[data-id="${id}"]`) as HTMLElement;

  cancelAnimationFrame(animations[id]);
  car.style.transform = 'none';
  await EngineService.engineStop(id);

  const startAnimationButton = document.querySelector(
    `.car__button-start[data-id="${id}"]`
  ) as HTMLButtonElement;
  const stopAnimationButton = document.querySelector(
    `.car__button-stop[data-id="${id}"]`
  ) as HTMLButtonElement;

  stopAnimationButton.disabled = true;
  startAnimationButton.disabled = false;
}
