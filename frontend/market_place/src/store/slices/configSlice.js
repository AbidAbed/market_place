import { createSlice } from "@reduxjs/toolkit";
const configSlice = createSlice({
  name: "config",
  initialState: { currentPath: "/shop", isLoggedIn: false },
  reducers: {
    setCurrentPath(state, action) {
      state.currentPath = action.payload;
    },
    setIsLoggedIn(state, action) {
      state.isLoggedIn = action.payload;
    },
  },
});

export { configSlice };
export const { setCurrentPath, setIsLoggedIn } = configSlice.actions;
