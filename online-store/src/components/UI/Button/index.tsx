import React from 'react';
import { ButtonProps } from './models';
import './style.scss';

const Button = (props: ButtonProps) => {
  const { type, text, onClick, iconName, iconPosition = 'left' } = props;
  const btnClassName = 'waves-effect waves-light btn button';
  const iconClassName = `material-icons ${iconPosition}`;

  return (
    <button
      type={type === 'button' ? 'button' : 'submit'}
      onClick={onClick}
      className={btnClassName}
    >
      {iconName && <i className={iconClassName}>{iconName}</i>}
      {text}
    </button>
  );
};

export default Button;

Button.defaultProps = {
  iconName: '',
  iconPosition: 'right'
};
