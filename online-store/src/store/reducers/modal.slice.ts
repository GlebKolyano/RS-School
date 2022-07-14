import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ModalObjType = {
  [id: string]: boolean;
};

interface IModalSlice {
  modalsID: ModalObjType;
}

const initialState: IModalSlice = {
  modalsID: {}
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    registerModal: (state, action: PayloadAction<string>) => {
      const stateVar = state;
      stateVar.modalsID[action.payload] = false;
    },
    changeModalState: (state, action: PayloadAction<string>) => {
      const stateVar = state;
      const fieldName = action.payload;
      stateVar.modalsID[fieldName] = !stateVar.modalsID[fieldName];
    }
  }
});

export const { registerModal, changeModalState } = modalSlice.actions;
export const modalReducer = modalSlice.reducer;
