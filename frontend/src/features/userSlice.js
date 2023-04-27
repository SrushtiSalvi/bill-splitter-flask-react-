import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    userlogin: (state, action) => {
      return action.payload;
    },
    logout: (state) => {
      // state.user = null;
      return {};
    },
  },
});

export const { userlogin, logout } = userSlice.actions;

export const selectUser = (state) => state.user;

export const selectUserAccessToken = (state) => state.user.access_token;

export default userSlice.reducer;
