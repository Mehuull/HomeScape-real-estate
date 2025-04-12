import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  listings: [], // Correct initialization
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
      state.listings = []; // Empty array, not null (to keep consistent type)
    },
    setListings: (state, action) => {
      state.listings = action.payload; // Always plain array
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    deleteListing: (state, action) => {
      state.listings = state.listings.filter((item) => item._id !== action.payload); // Pass _id only
    },
  },
});

// Export actions
export const { setLogin, setLogout, setListings, updateUser, deleteListing } = userSlice.actions;

// Export reducer
export default userSlice.reducer;
