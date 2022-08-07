import React from 'react';
import './style.scss';
import { TButtonProps } from './models';

const Button = ({ onClick, text, disabled, className, dataID }: TButtonProps) => {
  const finishedClassName = ['button', className];
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={finishedClassName.join(' ')}
      data-id={dataID}
    >
      {text}
    </button>
  );
};

export default Button;
