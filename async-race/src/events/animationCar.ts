import { engineDriveMode, engineStart, engineStop } from '../api/engineApi';
import { IEngineParams } from '../global/models';

const animations: { [index: number]: number } = {};

async function animateCar(id: number, car: HTMLElement, finish: HTMLElement, duration: number) {
  const animatedCar = car;
  let currentPositionOfCar = animatedCar.offsetLeft - 60;

  const finalPostion = finish.offsetLeft - 60;
  const framesCount = (duration / 1000) * 60;
  const dx = (finalPostion - animatedCar.offsetLeft) / framesCount;

  const tick = () => {
    currentPositionOfCar += dx;
    animatedCar.style.transform = `translateX(${currentPositionOfCar}px)`;

    if (currentPositionOfCar < finalPostion) {
      animations[id] = requestAnimationFrame(tick);
    } else {
      // console.log('finish!');
    }
  };

  tick();

  const result = await engineDriveMode(id);

  if (typeof result === 'string') {
    cancelAnimationFrame(animations[id]);
    return false;
  }

  return true;
}

export async function startAnimationCar(id: number) {
  const { distance, velocity } = (await engineStart(id)) as IEngineParams;
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

  const resultRace = await animateCar(id, car, finish, speed);
  return resultRace ? { id, speed } : Promise.reject();
}

export async function stopAnimationCar(id: number) {
  try {
    const car = document.querySelector(`.car__image[data-id="${id}"]`) as HTMLElement;

    car.style.transform = 'none';
    cancelAnimationFrame(animations[id]);
    await engineStop(id);

    const startAnimationButton = document.querySelector(
      `.car__button-start[data-id="${id}"]`
    ) as HTMLButtonElement;
    const stopAnimationButton = document.querySelector(
      `.car__button-stop[data-id="${id}"]`
    ) as HTMLButtonElement;

    stopAnimationButton.disabled = true;
    startAnimationButton.disabled = false;
  } catch (error) {
    throw new Error(error as string);
  }
}
