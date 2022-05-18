import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { place } from "../api/index";

const { createPlace, getOnePlace, getAllPlaces } = place;

const initialState = {};

export const createPlaceAsync = createAsyncThunk(
  "place/create",
  async (place) => {
    const response = await createPlace(place);
    return response;
  }
);

export const getOnePlaceAsync = createAsyncThunk(
  "place/getOnePlace",
  async (id) => {
    const response = await getOnePlace(id);
    return response.data;
  }
);

export const getAllPlacesAsync = createAsyncThunk(
  "place/getAllPlaces",
  async () => {
    const response = await getAllPlaces();
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

export const placeSlice = createSlice({
  name: "place",
  initialState,
  reducers: {
    // placeToEdit: (state, { payload: newPlaceData }) => {
    //   state.place = { ...state.place, ...newPlaceData };
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOnePlaceAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOnePlaceAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.place = action.payload;
      })
      .addCase(getAllPlacesAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllPlacesAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.allPlaces = action.payload;
      })
      .addCase(createPlaceAsync.fulfilled, (state, action) => {
        state.created = true;
      });
  },
});

// export const { placeToEdit } = userSlice.actions;

export const thisPlace = (state) => state.place.place;
export const allPlaces = (state) => state.place.allPlaces;
export const placeCreated = (state) => state.place.created;

export default placeSlice.reducer;
