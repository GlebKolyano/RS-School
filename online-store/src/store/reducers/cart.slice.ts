import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MAX_ITEMS_IN_CART } from '../../global/constants';
import LocaleStorage from '../../global/helpers/LocalStorage';
import { ICartInitialState } from '../../global/models';

const initialState: ICartInitialState = {
  itemsInCart: []
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    toggleItemToCart: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const { itemsInCart } = state;
      if (itemsInCart.includes(id)) {
        const indexOfId = itemsInCart.indexOf(id);
        itemsInCart.splice(indexOfId, 1);
      } else if (itemsInCart.length < MAX_ITEMS_IN_CART) {
        itemsInCart.push(id);
      }
      LocaleStorage.set('cartItems', itemsInCart);
    }
  }
});

export const { toggleItemToCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
