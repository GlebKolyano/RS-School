import { useMemo } from 'react';
import { FilterProps, IBicycle, SortOptions } from '../models/models';

export const useBicycles = (data: IBicycle[], filters: FilterProps, sortOption: string) => {
  const { searchValue } = filters;

  let filteredBicycles = data;

  filteredBicycles = useMemo(() => {
    return data.filter((item) => {
      return item.name.toLowerCase().includes(searchValue.toLowerCase());
    });
  }, [searchValue, data]);

  filteredBicycles = useMemo(() => {
    switch (sortOption) {
      case SortOptions.name_asc:
        return [...filteredBicycles].sort((a, b) => a.name.localeCompare(b.name));
      case SortOptions.name_desc:
        return [...filteredBicycles].sort((a, b) => b.name.localeCompare(a.name));
      case SortOptions.weight_asc:
        return [...filteredBicycles].sort((a, b) => b.weight - a.weight);
      case SortOptions.weight_desc:
        return [...filteredBicycles].sort((a, b) => a.weight - b.weight);
      case SortOptions.quantity_asc:
        return [...filteredBicycles].sort((a, b) => b.quantity - a.quantity);
      case SortOptions.quantity_desc:
        return [...filteredBicycles].sort((a, b) => a.quantity - b.quantity);
      default:
        return filteredBicycles;
    }
  }, [sortOption, filteredBicycles]);

  return filteredBicycles;
};
