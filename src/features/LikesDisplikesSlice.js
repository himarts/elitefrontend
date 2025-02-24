import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const likeProfile = createAsyncThunk(
  "likesDislikes/likeProfile",
  async ({  profileId }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      
      const response = await axios.post(
        `http://localhost:9000/api/profile/liked/${profileId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response)
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to like profile");
    }
  }
);

export const dislikeProfile = createAsyncThunk(
  "likesDislikes/dislikeProfile",
  async ({ userId, profileId }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:9000/api/profile/disliked/${ profileId }`,
       
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to dislike profile");
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
      });
  },
});

export default likesDislikesSlice.reducer;