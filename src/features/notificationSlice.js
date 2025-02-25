import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchNotifications = createAsyncThunk(
  "notifications/fetchNotifications",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:9000/api/notification/user-notifications", {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data.notifications;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const notificationSlice = createSlice({
  name: "notifications",
  initialState: { notifications: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default notificationSlice.reducer;
