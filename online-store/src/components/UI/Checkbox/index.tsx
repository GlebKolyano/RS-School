import React from 'react';

export type CheckboxProps = {
  value: string;
  name: string;
  onChange: (target: HTMLInputElement) => void;
  state?: string[];
};

export function Checkbox({ value, name, onChange, state = [] }: CheckboxProps) {
  const isCheckedBox = state !== null ? state.includes(value) : false;

  return (
    <li>
      <label htmlFor={value}>
        <input
          className="filled-in"
          id={value}
          type="checkbox"
          name={name}
          value={value}
          checked={isCheckedBox}
          onChange={(e) => {
            onChange(e.target);
          }}
        />
        <span>{value}</span>
      </label>
    </li>
  );
}

Checkbox.defaultProps = {
  state: []
};
