import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { urlService } from "./urlService";
import { DeleteUrlPayload, Url, UrlState } from "./urlInterface";

import { getErrorMessage } from "../../utils";

const initialState: UrlState = {
  urls: [],
  url: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getUrls = createAsyncThunk<
  Url[],
  null,
  { rejectValue: { message: string } }
>("urls/getAll", async (_, thunkAPI) => {
  try {
    return await urlService.getUrls();
  } catch (error) {
    const message = getErrorMessage(error);
    return thunkAPI.rejectWithValue({ message });
  }
});

export const getUrl = createAsyncThunk<
  Url,
  string,
  { rejectValue: { message: string } }
>("urls/getUrl", async (urlId, thunkAPI) => {
  try {
    return await urlService.getUrl(urlId);
  } catch (error) {
    const message = getErrorMessage(error);
    return thunkAPI.rejectWithValue({ message });
  }
});

export const deleteUrl = createAsyncThunk<
  DeleteUrlPayload,
  string,
  { rejectValue: { message: string } }
>("urls/deleteUrl", async (urlId, thunkAPI) => {
  try {
    return await urlService.deleteUrl(urlId);
  } catch (error) {
    const message = getErrorMessage(error);
    return thunkAPI.rejectWithValue({ message });
  }
});

export const addUrl = createAsyncThunk<
  Url,
  string,
  { rejectValue: { message: string } }
>("urls/addUrl", async (baseUrl, thunkAPI) => {
  try {
    return await urlService.addUrl(baseUrl);
  } catch (error) {
    const message = getErrorMessage(error);
    return thunkAPI.rejectWithValue({ message });
  }
});

export const urlsSlice = createSlice({
  name: "urls",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
      state.urls = [];
    },
  },
  extraReducers: (builder) => {
    builder

      // Get Urls
      .addCase(getUrls.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUrls.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.urls = action.payload;
      })
      .addCase(getUrls.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload?.message || "Something went wrong";
      })

      // Get Url by Id
      .addCase(getUrl.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUrl.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.url = action.payload;
      })
      .addCase(getUrl.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload?.message || "Something went wrong";
      })

      // Delete Url
      .addCase(deleteUrl.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUrl.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.urls = state.urls.filter(
          (url) => url._id !== action.payload.urlId
        );
      })
      .addCase(deleteUrl.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload?.message || "Something went wrong";
      })

      // Add Url
      .addCase(addUrl.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addUrl.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.urls.push(action.payload);
      })
      .addCase(addUrl.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload?.message || "Something went wrong";
      });
  },
});

export const { reset } = urlsSlice.actions;
export default urlsSlice.reducer;
