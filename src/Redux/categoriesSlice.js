"use client"

import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  currentMainCategory: null,
  currentSubCategory: null,
  currentProductCategory: null,
  loading: false,
  error: false,
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
    },
    fetchMainSuccess: (state, action) => {
      state.loading = false;
      state.currentMainCategory = action.payload;
    },
    fetchSubSuccess: (state, action) => {
      state.loading = false;
      state.currentSubCategory = action.payload;
    },
    fetchProductSuccess: (state, action) => {
      state.loading = false;
      state.currentProductCategory = action.payload;
    },
    fetchFailure: (state, action) => {
      state.error = true;
    },
  },
});

export const {
  fetchStart,
  fetchMainSuccess,
  fetchFailure,
  fetchSubSuccess,
  fetchProductSuccess,
} = categoriesSlice.actions;

export default categoriesSlice.reducer;
  