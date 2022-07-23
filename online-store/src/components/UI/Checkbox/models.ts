import { ChangeEvent } from 'react';

export type CheckboxProps = {
  value: string;
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  state?: string[];
};
