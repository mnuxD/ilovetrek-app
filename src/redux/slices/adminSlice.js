import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { admin } from "../api/index";

const { loginAdmin, getOneAdmin } = admin;

const initialState = {};

export const loginAdminAsync = createAsyncThunk(
  "admin/login",
  async (admin) => {
    const response = await loginAdmin(admin);
    return response;
  }
);

export const getOneAdminAsync = createAsyncThunk(
  "admin/getOneAdmin",
  async (id) => {
    const response = await getOneAdmin(id);
    return response.data;
  }
);

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOneAdminAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOneAdminAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.admin = action.payload;
      })
      .addCase(loginAdminAsync.pending, (state, action) => {
        state.alertLogin = false;
      })
      .addCase(loginAdminAsync.rejected, (state, action) => {
        state.alertLogin = true;
      })
      .addCase(loginAdminAsync.fulfilled, (state, action) => {
        state.alertLogin = false;
        state.adminInfo = action.payload; // state.adminInfo
        state.logguedAdmin = true;
        localStorage.setItem(
          "infoUserILoveTrekApp",
          JSON.stringify(action.payload)
        );
      });
  },
});

export const alertLogin = (state) => state.admin.alertLogin;
export const alertRegister = (state) => state.admin.alertRegister;
export const toAdmin = (state) => state.admin.admin;
export const userCreated = (state) => state.admin.created;

export default adminSlice.reducer;
