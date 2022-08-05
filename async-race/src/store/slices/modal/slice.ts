import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IModalInitialState } from './models';

const initialState: IModalInitialState = {
  modalsID: {},
  modalsContent: {}
};

export type TSetTextModalPayload = {
  modalID: string;
  modalText: string;
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    registerModalByID: (state, { payload: id }: PayloadAction<string>) => {
      const stateVar = state;
      const { modalsID } = stateVar;
      modalsID[id] = false;
    },
    toggleVisibilityModalByID: (state, { payload: fieldName }: PayloadAction<string>) => {
      const stateVar = state;
      const { modalsID } = stateVar;
      modalsID[fieldName] = !modalsID[fieldName];
    },
    setModalTextByID: (state, { payload }: PayloadAction<TSetTextModalPayload>) => {
      const stateVar = state;
      const { modalsContent } = stateVar;
      const { modalID, modalText } = payload;
      modalsContent[modalID] = modalText;
    }
  }
});

export const { registerModalByID, toggleVisibilityModalByID, setModalTextByID } =
  modalSlice.actions;
export default modalSlice.reducer;
