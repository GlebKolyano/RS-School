import React from 'react';
import { ErrorProps } from './models';
import './style.scss';

const Error = (props: ErrorProps) => {
  const { text, iconName, iconPosition = 'right' } = props;
  const iconClassName = `material-icons error__icon ${iconPosition}`;

  return (
    <div className="error" data-testid="error">
      <span className="error__text">
        <i className={iconClassName}>{iconName}</i>
        {text}
      </span>
    </div>
  );
};

export default Error;

Error.defaultProps = {
  iconName: '',
  iconPosition: 'right'
};
