import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { rating } from "../api/index";

const { createRating, getRatingByPlace, deleteRating } = rating;

const initialState = {};

export const createRatingAsync = createAsyncThunk(
  "rating/create",
  async (rating) => {
    const response = await createRating(rating);
    return response;
  }
);

export const getRatingsByPlaceAsync = createAsyncThunk(
  "rating/getRatingsByPlace",
  async (id) => {
    const response = await getRatingByPlace(id);
    return response.data;
  }
);

export const deleteRatingAsync = createAsyncThunk(
  "rating/delete",
  async (id) => {
    const response = await deleteRating(id);
    return response;
  }
);

export const ratingSlice = createSlice({
  name: "rating",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRatingsByPlaceAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRatingsByPlaceAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.ratings = action.payload;
      })
      .addCase(createRatingAsync.fulfilled, (state, action) => {
        state.created = true;
      })
      .addCase(deleteRatingAsync.fulfilled, (state, action) => {
        state.deleted = action.payload;
      });
  },
});

// export const { placeToEdit } = userSlice.actions;

export const ratings = (state) => state.rating.ratings;
export const ratingCreated = (state) => state.rating.created;

export default ratingSlice.reducer;
