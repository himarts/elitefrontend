import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// **Async Thunk to Fetch Unread Messages**
export const fetchUnreadMessages = createAsyncThunk(
  "messages/fetchUnread",
  async (token, { rejectWithValue }) => {


    try {
      const token = localStorage.getItem("token");   
      const response = await axios.get("http://localhost:5000/api/messages/unread-messages", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.unreadMessages; // Return unread message count
    } catch (error) {
      console.error("Error fetching unread messages:", error);
      return rejectWithValue(error.response?.data || "Failed to fetch unread messages");
    }
  }
);

// **Redux Slice**
const messageSlice = createSlice({
  name: "messages",
  initialState: {
    unreadCount: 0,
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
      });
  },
});

export const { incrementUnreadCount, resetUnreadCount } = messageSlice.actions;
export default messageSlice.reducer;
