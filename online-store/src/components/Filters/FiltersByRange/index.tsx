import React from 'react';
import { useAppDispatch } from '../../../hooks/reduxHooks';
import { FilterByRangePayload } from '../../../global/models';
import { setfilterByPrice, setfilterByQuantity } from '../../../store/reducers/filterByRange.slice';
import { getMinMaxValuesForRangeSlider } from '../../../store/helpers';
import Slider from '../../UI/Slider';

const FiltersByRange = () => {
  const dispatch = useAppDispatch();
  const { maxPrice, maxQuantity, minPrice, minQuantity } = getMinMaxValuesForRangeSlider();

  const handleChangePrice = (priceValue: FilterByRangePayload) => {
    dispatch(setfilterByPrice(priceValue));
  };

  const handleChangeQuantity = (quantityValue: FilterByRangePayload) => {
    dispatch(setfilterByQuantity(quantityValue));
  };

  return (
    <div data-testid="filter-by-range">
      <Slider
        minSliderValue={minQuantity}
        maxSliderValue={maxQuantity}
        onChange={handleChangeQuantity}
        name="filterByQuantity"
        label="Количество на складе:"
      />
      <Slider
        minSliderValue={minPrice}
        maxSliderValue={maxPrice}
        onChange={handleChangePrice}
        name="filterByPrice"
        label="По цене:"
      />
    </div>
  );
};

export default FiltersByRange;
