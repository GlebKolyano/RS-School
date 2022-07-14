import React from 'react';
import { ID_MODAL_CART } from '../../constants/constants';
import Modal from '../UI/Modal';

function Modals() {
  return (
    <div className="modals-wrapper">
      <Modal id={ID_MODAL_CART} text="Извините, все слоты заполнены" title="Уведомление" />
    </div>
  );
}

export default Modals;
