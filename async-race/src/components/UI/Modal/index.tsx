import React, { useEffect, useState } from 'react';
import { useTypedDispatch, useTypedSelector } from '../../../hooks/reduxHooks';
import { registerModalByID, toggleVisibilityModalByID } from '../../../store/slices/modal/slice';
import { TModalProps } from './models';
import './style.scss';

const Modal = ({ modalID, text, title }: TModalProps) => {
  const dispatch = useTypedDispatch();
  const { modalsID, modalsContent } = useTypedSelector(({ modalReducer }) => modalReducer);
  const [modalVisibility, setModalVisibility] = useState<boolean>(false);
  const modalText = modalsContent[modalID];

  useEffect(() => {
    dispatch(registerModalByID(modalID));
  }, [dispatch, modalID]);

  useEffect(() => {
    const isVisibleModal = modalsID[modalID];
    setModalVisibility(isVisibleModal);
  }, [modalID, modalsID]);

  const closeModalHandler = () => {
    setModalVisibility(false);
    dispatch(toggleVisibilityModalByID(modalID));
  };

  return (
    <div className={modalVisibility ? 'modal active' : 'modal'}>
      <div className="modal__content">
        <div className="modal__header">
          <h4 className="modal__header-title">{title}</h4>
        </div>
        <div className="modal__body">
          {text && <p>{text}</p>}
          <p>{modalText}</p>
        </div>
        <div className="modal__footer">
          <button type="button" onClick={closeModalHandler}>
            close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
