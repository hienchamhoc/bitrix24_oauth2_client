import { changeServerUrl, serverAxiosClient } from "@/app/api/axiosClient";
import installApi from "@/app/api/install";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export interface InstallParams {
  serverUrl: string;
}

export const install = createAsyncThunk(
  "app/install",
  async (params: InstallParams) => {
    try {
      changeServerUrl(params.serverUrl);
      const res = await installApi.testConnect();

      if (res.data === "ting") {
        return params.serverUrl;
      } else {
        throw new Error("Wrong server address");
      }
    } catch (e: any) {
      toast.error(e.message);
    }
  }
);

export const appSlice = createSlice({
  name: "app",
  initialState: {
    serverUrl: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(install.fulfilled, (state, action) => {
      if (action.payload) {
        state.serverUrl = action.payload;
      }
    });
  },
});

export default appSlice.reducer;
