import React from 'react';
import './style.scss';

type ButtonType = 'button' | 'submit';
type Props = {
  type: ButtonType;
  text: string;
  onClick: () => void;
  iconName?: string;
  iconPosition?: 'left' | 'right';
};

const Button = (props: Props) => {
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
