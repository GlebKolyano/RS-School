import { useMemo } from 'react';
import { SortingTypes } from '../global/models';
import { useTypedSelector } from './reduxHooks';

export default function useWinners() {
  const { winners, sorting } = useTypedSelector(({ winnersReducer }) => winnersReducer);

  const sortedWinners = useMemo(() => {
    const { TIME_ASC, TIME_DESC, WINS_ASC, WINS_DESC } = SortingTypes;
    console.log(sorting);
    switch (sorting) {
      case TIME_ASC:
        return [...winners].sort((a, b) => a.time - b.time);
      case TIME_DESC:
        return [...winners].sort((a, b) => b.time - a.time);
      case WINS_ASC:
        return [...winners].sort((a, b) => a.wins - b.wins);
      case WINS_DESC:
        return [...winners].sort((a, b) => b.wins - a.wins);
      default:
        return [...winners];
    }
  }, [sorting, winners]);
  return sortedWinners;
}
