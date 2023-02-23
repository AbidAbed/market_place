import { createSlice } from "@reduxjs/toolkit";
const ItemsSlice = createSlice({
  name: "items",
  initialState: [],
  reducers: {
    fetchItems(state, action) {
      return [...action.payload];
    },
    removeItemToCart(state, action) {
      let indx = 0;
      let item = state.reduce((acc, curr, index) => {
        if (curr.id === action.payload.id) {
          indx = index;
          acc = { ...curr };
        }
        return acc;
      }, {});
      if (item.amount !== 0) {
        if (item.amount === 1) item.status = "OUT OF STOCK";
        item.amount = item.amount - 1;
        item.amountPurchased = item.amountPurchased + 1;
      } else return [...state];

      const items = state.filter((obj) => obj.id !== item.id);
      items.splice(indx, 0, item);
      return [...items];
    },
    returnItemFromCart(state, action) {
      let indx = 0;
      let item = state.reduce((acc, curr, index) => {
        if (curr.id === action.payload.id) {
          indx = index;
          acc = { ...curr };
        }
        return acc;
      }, {});
      item.amount = item.amount + 1;
      item.status = "Available";

      const items = state.filter((obj) => obj.id !== item.id);
      items.splice(indx, 0, item);
      return [...items];
    },
  },
});

export { ItemsSlice };
export const { fetchItems, removeItemToCart, returnItemFromCart } =
  ItemsSlice.actions;
