import { useMemo } from 'react';
import { IBicycle, SortOptions } from '../global/models';
import { useAppSelector } from './reduxHooks';

/** useBicycles
 *
 * TODO: refactor every useMemo -- create separate functions
 *
 */

export const useBicycles = (bicycles: IBicycle[]) => {
  const { searchValue } = useAppSelector(({ searchReducer }) => searchReducer);
  const { sortOption } = useAppSelector(({ sortReducer }) => sortReducer);
  const filtersByValue = useAppSelector(({ filterByValueReducer }) => filterByValueReducer);
  const filtersByRange = useAppSelector(({ filterByRangeReducer }) => filterByRangeReducer);

  let filteredBicycles = bicycles;

  // search
  filteredBicycles = useMemo(() => {
    return bicycles.filter((item) => {
      return item.name.toLowerCase().includes(searchValue.toLowerCase());
    });
  }, [searchValue, bicycles]);

  // sorting
  filteredBicycles = useMemo(() => {
    switch (sortOption) {
      case SortOptions.name_asc:
        return [...filteredBicycles].sort((a, b) => a.name.localeCompare(b.name));
      case SortOptions.name_desc:
        return [...filteredBicycles].sort((a, b) => b.name.localeCompare(a.name));
      case SortOptions.price_asc:
        return [...filteredBicycles].sort((a, b) => a.price - b.price);
      case SortOptions.price_desc:
        return [...filteredBicycles].sort((a, b) => b.price - a.price);
      case SortOptions.quantity_asc:
        return [...filteredBicycles].sort((a, b) => a.quantity - b.quantity);
      case SortOptions.quantity_desc:
        return [...filteredBicycles].sort((a, b) => b.quantity - a.quantity);
      default:
        return filteredBicycles;
    }
  }, [sortOption, filteredBicycles]);

  // filter by value (checkbox)
  filteredBicycles = useMemo(() => {
    const companies = filtersByValue.filterByCompany;
    const colors = filtersByValue.filterByColor;
    const types = filtersByValue.filterByType;
    const isPopular = filtersByValue.filterByPopular;

    if (!companies.length && !colors.length && !types.length && !isPopular) {
      return filteredBicycles;
    }

    return filteredBicycles.filter((item) => {
      if (!companies.includes(item.brand) && companies.length) {
        return false;
      }
      if (!colors.includes(item.color) && colors.length) {
        return false;
      }
      if (!types.includes(item.type) && types.length) {
        return false;
      }
      if (isPopular) {
        if (!item.isPopular) return false;
      }
      return item;
    });
  }, [filtersByValue, filteredBicycles]);

  // filter by range
  filteredBicycles = useMemo(() => {
    const { filterByPrice, filterByQuantity } = filtersByRange;

    return filteredBicycles.filter((item) => {
      const isFilteredPrice = item.price >= filterByPrice.min && item.price <= filterByPrice.max;
      const isFilteredQuantity =
        item.quantity >= filterByQuantity.min && item.quantity <= filterByQuantity.max;

      if (isFilteredPrice && isFilteredQuantity) {
        return item;
      }
      return false;
    });
  }, [filtersByRange, filteredBicycles]);

  return filteredBicycles;
};
