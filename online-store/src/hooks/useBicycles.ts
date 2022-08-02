import { useMemo } from 'react';
import { IBicycle, SortOptions } from '../global/models';
import { useAppSelector } from './reduxHooks';

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
    const { NAME_ASC, NAME_DESC, PRICE_ASC, PRICE_DESC, QUANTITY_ASC, QUANTITY_DESC } = SortOptions;

    switch (sortOption) {
      case NAME_ASC:
        return [...filteredBicycles].sort((a, b) => a.name.localeCompare(b.name));
      case NAME_DESC:
        return [...filteredBicycles].sort((a, b) => b.name.localeCompare(a.name));
      case PRICE_ASC:
        return [...filteredBicycles].sort((a, b) => a.price - b.price);
      case PRICE_DESC:
        return [...filteredBicycles].sort((a, b) => b.price - a.price);
      case QUANTITY_ASC:
        return [...filteredBicycles].sort((a, b) => a.quantity - b.quantity);
      case QUANTITY_DESC:
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
