import React from 'react';
import './style.css';
import 'materialize-css';

function Loader() {
  return (
    <div className="progress">
      <div className="indeterminate" />
    </div>
  );
}

export default Loader;
