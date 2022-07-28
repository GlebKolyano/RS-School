import React from 'react';
import './style.scss';
import { TErrorProps } from './models';

const Error = ({ text }: TErrorProps) => {
  return <div className="error">{text}</div>;
};

export default Error;
