import { createSlice } from "@reduxjs/toolkit";
const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addItemToCart(state, action) {
      let indx = 0;
      let item = state.reduce((acc, curr, index) => {
        if (curr.id === action.payload.id) {
          indx = index;
          acc = { ...curr };
        }
        return acc;
      }, {});
      if (Object.keys(item).length !== 0)
        item.amountPurchased = item.amountPurchased + 1;
      else {
        item = { ...action.payload };
        item.amountPurchased = 1;
      }
      const cart = state.filter((obj) => obj.id !== item.id);
      cart.splice(indx, 0, item);
      return [...cart];
    },
    removeCartItem(state, action) {
      let indx = 0;
      const cartItems = state.filter((item) => item.id !== action.payload.id);
      const item = state.reduce((acc, curr, index) => {
        if (curr.id === action.payload.id) {
          indx = index;
          acc = { ...curr };
        }
        return acc;
      }, {});
      if (item.amountPurchased !== 1) {
        item.amountPurchased = item.amountPurchased - 1;
        cartItems.splice(indx, 0, item);
        return [...cartItems];
      } else return [...cartItems];
    },
    removeAll(state, action) {
      return [];
    },
  },
});
export { cartSlice };
export const { addItemToCart, removeCartItem, removeAll } = cartSlice.actions;
