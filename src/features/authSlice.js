import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for user registration
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:9000/api/auth/register", userData);
      localStorage.setItem("token", response.data.token);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const resendOtp = createAsyncThunk("/auth/resend-Otp", async (_, { rejectWithValue }) => {
  try {
    let token = localStorage.getItem("token");
    if (!token) return rejectWithValue("No token found. Please log in again.");

    const response = await axios.post(
      "http://localhost:9000/api/auth/resend-otp",
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    localStorage.setItem("token", response.data.token); // Store the new token
    return response.data.message;
  } catch (error) {
    console.log(error)
    return rejectWithValue(error.response?.data?.message || "Failed to resend OTP");
  }
});



// Verify OTP
export const verifyOtp = createAsyncThunk(
  "/auth/verify-Otp",
  async (verificationCode, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token"); // Get token from storage
      if (!token) {
        console.error("No token found in localStorage");
        return rejectWithValue("No token found");
      }

      // Store the response
      const response = await axios.post(
        "http://localhost:9000/api/auth/verify-Otp",
        { verificationCode },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      return response.data; // Return the data correctly
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data?.message || "OTP verification failed");
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:9000/api/auth/login", credentials);
      localStorage.setItem("token", response.data.token); // Store token
      console.log(response)
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);


export const checkProfileCompletion = createAsyncThunk(
  "auth/checkProfileCompletion",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/profile-progress`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Error checking profile");
    }
  }
);





const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    loading: false,
    error: null,
    message:"",
    isProfileComplete: false, // ✅
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },   
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.token = action.payload.token;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(resendOtp.fulfilled, (state) => {
        state.error = null;
      })
      .addCase(resendOtp.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(checkProfileCompletion.fulfilled, (state, action) => {
        state.isProfileComplete = action.payload.isProfileComplete;
      })
      .addCase(checkProfileCompletion.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
