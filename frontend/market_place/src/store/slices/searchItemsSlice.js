import { createSlice } from "@reduxjs/toolkit";
const searchItemsSlice = createSlice({
  name: "searchItems",
  initialState: [],
  reducers: {
    searchItem(state, action) {
      const { items, title } = action.payload;
      if (items.length) {
        const searchItems = items.filter((item) => item.title.includes(title));
        return [...searchItems];
      } else {
        return [];
      }
    },
  },
});
export { searchItemsSlice };
export const { searchItem } = searchItemsSlice.actions;
