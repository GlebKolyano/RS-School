import React from 'react';
import './style.scss';

type Props = {
  text: string;
  iconName?: string;
  iconPosition?: 'left' | 'right';
};

function Error(props: Props) {
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
}

export default Error;

Error.defaultProps = {
  iconName: '',
  iconPosition: 'right'
};
