import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    fetchUser(state, action) {
      return action.payload;
    },
  },
});

export { userSlice };
export const { fetchUser } = userSlice.actions;
