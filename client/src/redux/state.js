import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  listings: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
      state.listings = []; 
    },
    setListings: (state, action) => {
      state.listings = action.payload; 
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    deleteListing: (state, action) => {
      state.listings = state.listings.filter((item) => item._id !== action.payload); 
    },
  },
});

export const { setLogin, setLogout, setListings, updateUser, deleteListing } = userSlice.actions;

export default userSlice.reducer;
