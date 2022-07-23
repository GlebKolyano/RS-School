import React from 'react';
import './style.scss';

const Loader = () => {
  return (
    <div className="progress" data-testid="loader">
      <div className="indeterminate" />
    </div>
  );
};

export default Loader;
