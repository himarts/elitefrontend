import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch user notifications
export const fetchUserNotifications = createAsyncThunk(
  "notifications/fetchUserNotifications",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:9000/api/notification/user-notifications", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch notifications");

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Mark all notifications as read
export const markAllNotificationsAsRead = createAsyncThunk(
  "notifications/markAllNotificationsAsRead",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:9000/api/notification/mark-all-read", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to mark notifications as read");

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const markNotificationAsRead = createAsyncThunk(
  "notifications/markNotificationAsRead",
  async (notificationId, { rejectWithValue }) => {
    try {
      await axios.put(`/api/notifications/mark-as-read/${notificationId}`);
      return notificationId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


// Clear all notifications
export const clearUserNotifications = createAsyncThunk(
  "notifications/clearUserNotifications",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:9000/api/notification/clear-notifications", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!response.ok) throw new Error("Failed to clear notifications");

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Notification Slice
const notificationSlice = createSlice({
  name: "notifications",
  initialState: {
    list: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserNotifications.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserNotifications.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchUserNotifications.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(markAllNotificationsAsRead.fulfilled, (state) => {
        state.list = state.list.map((notif) => ({ ...notif, read: true }));
      })
      .addCase(clearUserNotifications.fulfilled, (state) => {
        state.list = [];
      });
  },
});

export default notificationSlice.reducer;
