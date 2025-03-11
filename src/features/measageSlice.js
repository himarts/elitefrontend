import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// **Async Thunk to Fetch Unread Messages**
export const fetchUnreadMessages = createAsyncThunk(
  "messages/fetchUnread",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");   
      const response = await axios.get("http://localhost:9000/api/chats/unread-messages", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response);
      return response.data.unreadMessages; // Return unread message count
    } catch (error) {
      console.error("Error fetching unread messages:", error);
      return rejectWithValue(error.response?.data || "Failed to fetch unread messages");
    }
  }
);

// **✅ Convert `markMessagesAsRead` to an Async Thunk**
export const markMessagesAsRead = createAsyncThunk(
  "messages/markAsRead",
  async (senderId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");   
      await axios.put(
        "http://localhost:9000/api/chats/read",
        { senderId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return senderId; // Return sender ID (optional)
    } catch (error) {
      console.error("Failed to mark messages as read:", error);
      return rejectWithValue(error.response?.data || "Failed to mark messages as read");
    }
  }
);


export const resetUnreadMessages = createAsyncThunk(
  "messages/resetUnread",
  async (senderId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");   
      const response = await axios.put(
        `http://localhost:9000/api/chats/reset-unread-messages`,
        {senderId},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response)
      return response.data.message; // Return success message
    } catch (error) {
      console.error("Error resetting unread messages:", error);
      return rejectWithValue(error.response?.data || "Failed to reset unread messages");
    }
  }
);

// **Redux Slice**
const messageSlice = createSlice({
  name: "messages",
  initialState: {
    unreadCount: 0,
    notifications: [],
    status: "idle", // "idle" | "loading" | "succeeded" | "failed"
    error: null,
  },
  reducers: {
    incrementUnreadCount: (state) => {
      state.unreadCount += 1; // Increment unread count when receiving new messages
    },
    resetUnreadCount: (state) => {
      state.unreadCount = 0; // Reset unread count when messages are read
    },
    setNotifications: (state, action) => {
      state.notifications = action.payload;  // ✅ Make sure to update notifications
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUnreadMessages.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUnreadMessages.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.unreadCount = action.payload;
      })
      .addCase(fetchUnreadMessages.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(markMessagesAsRead.fulfilled, (state) => {
        state.unreadCount = 0; // Reset unread count after marking as read
      })
      .addCase(markMessagesAsRead.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(resetUnreadMessages.fulfilled, (state) => {
        state.unreadCount = 0; // Reset unread count to 0
      })
      .addCase(resetUnreadMessages.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { incrementUnreadCount, resetUnreadCount } = messageSlice.actions;
export default messageSlice.reducer;
