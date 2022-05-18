import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { rating } from "../api/index";

const { createRating, getRatingByPlace } = rating;

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

// export const updateUser1Async = createAsyncThunk(
//   "user/update1",
//   async (user) => {
//     const response = await updateUser1(user);
//     return response;
//   }
// );

export const ratingSlice = createSlice({
  name: "rating",
  initialState,
  reducers: {
    // placeToEdit: (state, { payload: newPlaceData }) => {
    //   state.place = { ...state.place, ...newPlaceData };
    // },
  },
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
      });
  },
});

// export const { placeToEdit } = userSlice.actions;

export const ratings = (state) => state.rating.ratings;
export const ratingCreated = (state) => state.rating.created;

export default ratingSlice.reducer;
