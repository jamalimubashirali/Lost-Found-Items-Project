import { createSlice } from "@reduxjs/toolkit";

const initiaState = {
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initiaState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
    },
    logout(state, action) {
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
