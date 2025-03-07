import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {jwtDecode} from "jwt-decode";

const API_URL = "http://localhost:9000/api/auth";

// Forgot Password - Request Reset Code
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/forgot-password`, { email });
      localStorage.setItem("token", response.data.token);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to send reset code");
    }
  }
);

// export const verifyResetPassword = createAsyncThunk(
//   "/auth/verify-Otp",
//   async (verificationCode, { rejectWithValue }) => {
//     try {
//       const token = localStorage.getItem("token"); // Get token from storage
//       if (!token) {
//         console.error("No token found in localStorage");
//         return rejectWithValue("No token found");
//       }

//       // Store the response
//       const response = await axios.post(
//         "http://localhost:9000/api/auth/verify-reset-password",
//         { verificationCode },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       return response.data; // Return the data correctly
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || "OTP verification failed");
//     }
//   }
// );


// Verify Reset Code


export const verifyResetPasswordCode = createAsyncThunk(
  "auth/verifyResetCode",
  async ({ otpCode }, { rejectWithValue }) => {
    try {

      // Get token from localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      // Send request to backend with token in headers
      const response = await axios.post(
        `${API_URL}/verify-reset-code`,
        { verificationCode: otpCode, token }, // Backend extracts email from token
);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || error.message || "Invalid reset code");
    }
  }
);



export const resetPasswordd = createAsyncThunk(
  "auth/resetPassword",
  async ({ newPassword, token }, { rejectWithValue }) => {
    try {
      if (!token) {
        throw new Error("Reset token is required");
      }


      const response = await axios.post(`${API_URL}/reset-password`, {
        token, // Send the reset token
        newPassword, // Send the new password
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Failed to reset password");
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
      .addCase(verifyResetPasswordCode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyResetPasswordCode.fulfilled, (state) => {
        state.loading = false;
        state.success = "verified";
      })
      .addCase(verifyResetPasswordCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(resetPasswordd.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPasswordd.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(resetPasswordd.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default resetSlice.reducer;
