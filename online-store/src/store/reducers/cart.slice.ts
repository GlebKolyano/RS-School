import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MAX_ITEMS_IN_CART } from '../../constants/constants';
import LocaleStorage from '../../helpers/LocaleStorage';
import { getCartItemsFromStore } from './helpers';

const Storage = new LocaleStorage();
const cartStore = getCartItemsFromStore();

const initialState = {
  itemsInCart: cartStore || []
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
      Storage.set('cartItems', itemsInCart);
    }
  }
});

export const { toggleItemToCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
