import React from 'react';
import { SHOW_WINNER_MODAL } from '../../global/constants';
import Modal from '../UI/Modal';

const Modals = () => {
  return (
    <div className="modals">
      <Modal modalID={SHOW_WINNER_MODAL} title="Winner" />
    </div>
  );
};

export default Modals;
