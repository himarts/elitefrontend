import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:9000/api/profiles";

// Like a profile
export const likeProfile = createAsyncThunk(
  "likesDislikes/likeProfile",
  async ({ profileId }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${BASE_URL}/likes/${profileId}`,
        {}, // No request body needed
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
console.log(response.data)
      return response.data;
    } catch (error) {
      console.error("Error in likeProfile:", error);
      return rejectWithValue(error.response?.data?.message || "Failed to like profile");
    }
  }
);

// Dislike a profile
export const dislikeProfile = createAsyncThunk(
  "likesDislikes/dislikeProfile",
  async ({ profileId }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${BASE_URL}/disliked/${profileId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data)

      return response.data;
    } catch (error) {
      console.error("Error in dislikeProfile:", error);
      return rejectWithValue(error.response?.data?.message || "Failed to dislike profile");
    }
  }
);

// Get all liked users
export const getLikedUsers = createAsyncThunk(
  "likesDislikes/getLikedUsers",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/liked`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error in getLikedUsers:", error);
      return rejectWithValue(error.response?.data?.message || "Failed to fetch liked users");
    }
  }
);

// Get all disliked users
export const getDislikedUsers = createAsyncThunk(
  "likesDislikes/getDislikedUsers",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/disliked`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error in getDislikedUsers:", error);
      return rejectWithValue(error.response?.data?.message || "Failed to fetch disliked users");
    }
  }
);

const likesDislikesSlice = createSlice({
  name: "likesDislikes",
  initialState: {
    likes: [],
    dislikes: [],
    status: "idle", // idle | loading | succeeded | failed
    error: null,
    allLikedUsers: [],
    allDislikedUsers: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(likeProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(likeProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.likes.push(action.payload);
      })
      .addCase(likeProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(dislikeProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(dislikeProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.dislikes.push(action.payload);
      })
      .addCase(dislikeProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(getLikedUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getLikedUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allLikedUsers = action.payload; // ✅ Set data instead of pushing
      })
      .addCase(getLikedUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(getDislikedUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getDislikedUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.allDislikedUsers = action.payload; // ✅ Set data instead of pushing
      })
      .addCase(getDislikedUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default likesDislikesSlice.reducer;
