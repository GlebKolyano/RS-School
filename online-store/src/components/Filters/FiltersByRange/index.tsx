import React from 'react';
import { useAppDispatch } from '../../../hooks/reduxHooks';
import { FilterByRangePayload } from '../../../models/models';
import { setfilterByPrice, setfilterByQuantity } from '../../../store/reducers/filterByRange.slice';
import Slider from '../../UI/Slider';
import { getMinMaxValues } from '../../../helpers/helpers';

function FilterByRange() {
  const dispatch = useAppDispatch();
  const minMaxValues = getMinMaxValues();

  const handleChangePrice = (vl: FilterByRangePayload) => {
    dispatch(setfilterByPrice(vl));
  };

  const handleChangeQuantity = (vl: FilterByRangePayload) => {
    dispatch(setfilterByQuantity(vl));
  };
  return (
    <div>
      <p>Количество на складе:</p>
      <Slider
        minVl={minMaxValues.minQuantity}
        maxVl={minMaxValues.maxQuantity}
        onChange={handleChangeQuantity}
        name="filterByQuantity"
      />
      <p>По цене:</p>
      <Slider
        minVl={minMaxValues.minPrice}
        maxVl={minMaxValues.maxPrice}
        onChange={handleChangePrice}
        name="filterByPrice"
      />
    </div>
  );
}

export default FilterByRange;
