import React from 'react';

type CheckboxProps = {
  value: string;
  name: string;
  onChange: (target: HTMLInputElement) => void;
  state?: string[];
};

export function Checkbox(props: CheckboxProps) {
  const { value, name, onChange, state = [] } = props;
  const isCheckedBox = state ? state.includes(value) : false;

  return (
    <li data-testid="checkbox">
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
