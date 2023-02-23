import { createSlice } from "@reduxjs/toolkit";
const purchasedItemsSlice = createSlice({
  name: "purchases",
  initialState: [],
  reducers: {
    fetchPurchases(state, action) {
      return [...action.payload];
    },
    addPurchase(state, action) {
      return [...state, action.payload];
    },
  },
});
export { purchasedItemsSlice };
export const { fetchPurchases, addPurchase } = purchasedItemsSlice.actions;
