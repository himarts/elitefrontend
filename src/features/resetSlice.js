import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:9000/api/auth";

// Forgot Password - Request Reset Code
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/forgot-password`, { email });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to send reset code");
    }
  }
);

// Verify Reset Code
export const verifyResetCode = createAsyncThunk(
  "auth/verifyResetCode",
  async ({ email, resetCode }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/verify-reset-code`, { email, resetCode });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Invalid reset code");
    }
  }
);

// Reset Password
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ email, newPassword }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/reset-password`, { email, newPassword });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to reset password");
    }
  }
);

const resetSlice = createSlice({
  name: "reset",
  initialState: {
    loading: false,
    error: null,
    success: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(verifyResetCode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyResetCode.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(verifyResetCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default resetSlice.reducer;
