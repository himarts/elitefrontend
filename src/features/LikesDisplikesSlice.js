import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const likeProfile = createAsyncThunk(
  "likesDislikes/likeProfile",
  async ({ profileId }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:9000/api/profiles/likes/${profileId}`,
        {}, // No request body needed
        {
          headers: {
            "Content-Type": "application/json", // ✅ Fix: Ensure JSON headers
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error in likeProfile:", error);
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
        `http://localhost:9000/api/profiles/disliked/${ profileId }`,
       {},
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


// get all liked users

export const getLikedUsers = createAsyncThunk(
  "likesDislikes/getLikedUsers",async (userId, { rejectWithValue }) => {
try {
  const token = localStorage.getItem("token");
  const response = await axios.get(
    `http://localhost:9000/api/profiles/liked`,

    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  (response)
  return response.data;
} catch (error) {
  return rejectWithValue(error.response?.data || "Failed to fetch liked users");
  
}
  }
);

export const getDislikedUsers = createAsyncThunk(
  "likesDislikes/getDislikedUsers" ,async (userId, {rejectWithValue}) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:9000/api/profiles/disliked`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "failed to fetched disliked users");
    }
  }
)







const likesDislikesSlice = createSlice({
  name: "likesDislikes",
  initialState: {
    likes: [],
    dislikes: [],
    status: "idle", // idle | loading | succeeded | failed
    error: null,
    allLikedUsers:[],
    allDislikedUsers:[],
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
        state.allLikedUsers.push(action.payload);
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
        state.allDislikedUsers.push(action.payload);
      })
      .addCase(getDislikedUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default likesDislikesSlice.reducer;