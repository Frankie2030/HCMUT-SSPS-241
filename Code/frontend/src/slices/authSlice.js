import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData"))
    : {
        _id: null,
        googleId: null,
        firstName: null,
        lastName: null,
        avatar: null,
        email: null,
        role: null,
        pageBalance: null,
      },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userData = action.payload;
      localStorage.setItem("userData", JSON.stringify(action.payload));

      const expirationTime = new Date().getTime() + 24 * 60 * 60 * 1000;
      localStorage.setItem("expirationTime", expirationTime);
    },
    logout: (state) => {
      state.userData = {
        _id: null,
        googleId: null,
        firstName: null,
        lastName: null,
        avatar: null,
        email: null,
        role: null,
        pageBalance: null,
      };
      localStorage.removeItem("userData");
      localStorage.removeItem("expirationTime");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
