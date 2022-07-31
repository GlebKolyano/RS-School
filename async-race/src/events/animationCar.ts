import { engineDriveMode, engineStart, engineStop } from '../api/engineApi';
import { IEngineParams } from '../global/models';

const animations: { [index: number]: number } = {};

function animateCar(id: number, car: HTMLElement, finish: HTMLElement, duration: number) {
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

  const startDriveModeCar = async () => {
    try {
      const status = (await engineDriveMode(id)) as number;

      if (status !== 200) {
        throw new Error(status as unknown as string);
      }
    } catch (error) {
      cancelAnimationFrame(animations[id]);
    }
  };
  startDriveModeCar().catch(() => {});
}

export function startAnimationCar(id: number) {
  (async function wrapper() {
    try {
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

      animateCar(id, car, finish, speed);
    } catch (error) {
      throw new Error(error as string);
    }
  })().catch(() => {});
}

export function stopAnimationCar(id: number) {
  (async function wrapper() {
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
  })().catch(() => {});
}
