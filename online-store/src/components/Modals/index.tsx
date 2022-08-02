import React from 'react';
import { ID_MODAL_CART } from '../../global/constants';
import Modal from '../UI/Modal';

const Modals = () => {
  return (
    <div className="modals-wrapper" data-testid="modals">
      <Modal id={ID_MODAL_CART} text="Извините, все слоты заполнены" title="Уведомление" />
    </div>
  );
};

export default Modals;
