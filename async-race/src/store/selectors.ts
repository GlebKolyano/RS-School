import { useTypedSelector } from '../hooks/reduxHooks';

export const useCarSelector = () => useTypedSelector(({ carsReducer }) => carsReducer);
export const useModalSelector = () => useTypedSelector(({ modalReducer }) => modalReducer);
export const useRaceSelector = () => useTypedSelector(({ raceReducer }) => raceReducer);
export const useWinnerSelector = () => useTypedSelector(({ winnersReducer }) => winnersReducer);
export const useCarPaginationSelector = () =>
  useTypedSelector(({ carsPaginationReducer }) => carsPaginationReducer);
export const useWinnerPaginationSelector = () =>
  useTypedSelector(({ winnersPaginationReducer }) => winnersPaginationReducer);
