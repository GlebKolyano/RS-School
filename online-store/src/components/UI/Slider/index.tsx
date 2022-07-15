import React, { useEffect, useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './style.scss';
import { FilterByRangePayload } from '../../../models/models';
import { useAppSelector } from '../../../hooks/reduxHooks';

type SliderProps = {
  minVl: number;
  maxVl: number;
  onChange: (value: FilterByRangePayload) => void;
  name: 'filterByPrice' | 'filterByQuantity';
};

export default function RangeSlider(props: SliderProps) {
  const { minVl, maxVl, onChange, name } = props;
  const filters = useAppSelector((s) => s.filterByRangeReducer);
  const filtersBySomeCategory = filters[name];
  const [state, setState] = useState({
    value: [filtersBySomeCategory.min || minVl, filtersBySomeCategory.max || maxVl]
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
    <div>
      <span>от {state.value[0]} | </span>
      <span>до {state.value[1]}</span>
      <br />
      <Slider
        defaultValue={(filtersBySomeCategory.min || minVl, filtersBySomeCategory.max || maxVl)}
        min={minVl}
        max={maxVl}
        step={1}
        range
        allowCross={false}
        value={state.value}
        onChange={handleChangeState}
        onAfterChange={handleChangeStorageValue}
      />
    </div>
  );
}
