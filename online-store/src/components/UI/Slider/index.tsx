import React, { useEffect, useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './style.scss';
import { FilterByRangePayload } from '../../../global/models';
import { useAppSelector } from '../../../hooks/reduxHooks';

type SliderProps = {
  minSliderValue: number;
  maxSliderValue: number;
  onChange: (value: FilterByRangePayload) => void;
  name: 'filterByPrice' | 'filterByQuantity';
  label: string;
};

const RangeSlider = (props: SliderProps) => {
  const { minSliderValue, maxSliderValue, onChange, name, label } = props;
  const filters = useAppSelector(({ filterByRangeReducer }) => filterByRangeReducer);
  const filtersBySomeCategory = filters[name];

  const [state, setState] = useState({
    value: [
      filtersBySomeCategory.min || minSliderValue,
      filtersBySomeCategory.max || maxSliderValue
    ]
  });

  const handleChangeStorageValue = (value: number | number[]) => {
    if (Array.isArray(value)) {
      const [min, max] = value;
      const res = { min, max };
      onChange(res);
    }
  };

  const handleChangeState = (value: number | number[]) => {
    if (Array.isArray(value)) {
      setState({ value });
    }
  };

  useEffect(() => {
    const value = [filtersBySomeCategory.min, filtersBySomeCategory.max];
    setState({ value });
  }, [filtersBySomeCategory]);

  return (
    <div data-testid="slider">
      <p>{label}</p>
      <span>от {state.value[0]} | </span>
      <span>до {state.value[1]}</span>
      <br />
      <Slider
        defaultValue={
          (filtersBySomeCategory.min || minSliderValue, filtersBySomeCategory.max || maxSliderValue)
        }
        min={minSliderValue}
        max={maxSliderValue}
        step={1}
        range
        allowCross={false}
        value={state.value}
        onChange={handleChangeState}
        onAfterChange={handleChangeStorageValue}
      />
    </div>
  );
};

export default RangeSlider;
