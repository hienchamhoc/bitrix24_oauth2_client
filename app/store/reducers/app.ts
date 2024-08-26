import { changeServerUrl, serverAxiosClient } from "@/app/api/axiosClient";
import installApi from "@/app/api/install";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export const login = createAsyncThunk("app/login", async (userId: number) => {
  return userId;
});

export const appSlice = createSlice({
  name: "app",
  initialState: {
    userId: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      if (action.payload) {
        state.userId = action.payload;
      }
    });
  },
});

export default appSlice.reducer;
