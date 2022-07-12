import { useMemo } from 'react';
import { FilterProps, IBicycle } from '../models/models';

export const useBicycles = (data: IBicycle[], filters: FilterProps) => {
  const { searchValue } = filters;

  let filteredBicycles = data;

  filteredBicycles = useMemo(() => {
    return data.filter((item) => {
      return item.name.toLowerCase().includes(searchValue.toLowerCase());
    });
  }, [searchValue, data]);

  return filteredBicycles;
};
