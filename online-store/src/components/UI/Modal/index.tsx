import React, { useEffect, useState } from 'react';
import './style.scss';
import Button from '../Button';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { changeModalState, registerModal } from '../../../store/slices/modal/slice';
import { ModalProps } from './models';

const Modal = (props: ModalProps) => {
  const dispatch = useAppDispatch();
  const { id, text, title } = props;
  const { modalsID } = useAppSelector(({ modalReducer }) => modalReducer);
  const [isModalVisible, setModalVisibility] = useState(false);

  useEffect(() => {
    dispatch(registerModal(id));
  }, [dispatch, id]);

  useEffect(() => {
    const newState = modalsID[id];
    setModalVisibility(newState);
  }, [id, modalsID]);

  if (!isModalVisible) {
    return null;
  }

  const handleChangeVisibility = () => {
    setModalVisibility(false);
    dispatch(changeModalState(id));
  };

  return (
    <div className="modal" data-testid="modal">
      <div className="modal__content">
        <div className="modal__header">
          <h4 className="modal__header-title">{title}</h4>
        </div>
        <div className="modal__body">
          <p>{text}</p>
        </div>
        <div className="modal__footer">
          <Button type="button" onClick={handleChangeVisibility} text="Закрыть" />
        </div>
      </div>
    </div>
  );
};

export default Modal;
