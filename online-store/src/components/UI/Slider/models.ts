import { FilterByRangePayload } from '../../../global/models';

export type SliderProps = {
  minSliderValue: number;
  maxSliderValue: number;
  onChange: (value: FilterByRangePayload) => void;
  name: 'filterByPrice' | 'filterByQuantity';
  label: string;
};
