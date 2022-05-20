import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import placeReducer from "../slices/placeSlice";
import ratingReducer from "../slices/ratingSlice";
import adminReducer from "../slices/adminSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    place: placeReducer,
    rating: ratingReducer,
    admin: adminReducer,
  },
});
