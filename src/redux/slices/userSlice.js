import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { user } from "../api/index";

const {
  loginUser,
  getOneUser,
  getAllRequests,
  registerUser,
  updateUser1,
  updateUser2,
} = user;

const initialState = {};

export const loginUserAsync = createAsyncThunk("user/login", async (user) => {
  const response = await loginUser(user);
  return response;
});

export const registerUserAsync = createAsyncThunk(
  "user/create",
  async (user) => {
    const response = await registerUser(user);
    return response;
  }
);

export const getOneUserAsync = createAsyncThunk(
  "user/getOneUser",
  async (id) => {
    const response = await getOneUser(id);
    return response.data;
  }
);

export const getAllRequestsAsync = createAsyncThunk(
  "user/requests",
  async () => {
    const response = await getAllRequests();
    return response.data;
  }
);

export const updateUser1Async = createAsyncThunk(
  "user/update1",
  async (user) => {
    const response = await updateUser1(user);
    return response;
  }
);

export const updateUser2Async = createAsyncThunk(
  "user/update2",
  async (user) => {
    const response = await updateUser2(user);
    return response;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userToEdit: (state, { payload: newUserData }) => {
      state.user = { ...state.user, ...newUserData };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOneUserAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOneUserAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getAllRequestsAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllRequestsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.requests = action.payload;
      })
      .addCase(loginUserAsync.pending, (state, action) => {
        state.alertLogin = false;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.alertLogin = true;
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.alertLogin = false;
        state.userInfo = action.payload; // state.userInfo
        state.logguedUser = true;
        localStorage.setItem(
          "infoUserILoveTrekApp",
          JSON.stringify(action.payload)
        );
      })
      .addCase(registerUserAsync.pending, (state, action) => {
        state.alertRegister = false;
      })
      .addCase(registerUserAsync.rejected, (state, action) => {
        state.alertRegister = true;
      })
      .addCase(registerUserAsync.fulfilled, (state, action) => {
        state.alertRegister = false;
        state.created = true;
      });
  },
});

export const { userToEdit } = userSlice.actions;

export const selectUserLoggued = (state) => state.user.logguedUser;
export const alertLogin = (state) => state.user.alertLogin;
export const alertRegister = (state) => state.user.alertRegister;
export const toUser = (state) => state.user.user;
export const toRequests = (state) => state.user.requests;
export const userCreated = (state) => state.user.created;

export default userSlice.reducer;
