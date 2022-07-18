import React from 'react';
import './style.scss';

function Loader() {
  return (
    <div className="progress" data-testid="loader">
      <div className="indeterminate" />
    </div>
  );
}

export default Loader;
