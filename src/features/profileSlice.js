import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async ({ userId, profileData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.put(`http://localhost:9000/api/profile/update/${userId}`, profileData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update profile");
    }
  }
);

export const getProfile = createAsyncThunk(
  "profile/getProfile",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:9000/api/profile/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch data");
    }
  }
);



export const getOnlineUsers = createAsyncThunk(
  "profile/getOnlineUsers",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get("http://localhost:9000/api/profile/online-users", {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ Include token
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch online users");
    }
  }
);


const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profile: {
      name: "",
      username: "",
      email: "",
      phone: "",
      gender: "",
      dateOfBirth: "",
      location: "",
      profilePicture: "",
      bio: "",
      relationshipStatus: "",
      lookingFor: "",
      preferredAgeRange: [18, 50],
      genderPreference: "",
      preferredLocationRadius: 50,
      communicationStyle: "",
      loveLanguage: "",
      socialHabit: "",
      sleepingHabit: "",
      datingPace: "",
      fitnessLifestyle: "",
      workFlexibility: "",
      isVerified: false,
      verificationStatus: "unverified",
      verificationMethod: "",
      securityOption: "",
      idFront: "",
      idBack: "",
      children: "",
      interests: [],
      hobbies: [],
      languagesSpoken: "",
      religion: "",
      dietaryPreferences: "",
      smoking: "",
      drinking: "",
      occupation: "",
      educationLevel: "",
      incomeRange: "",
      workSchedule: "",
      zodiacSign: "",
      height: "",
      weight: "",
      bodyType: "",
      hairColor: "",
      eyeColor: "",
      facialHair: "",
      tattoos: false,
      piercings: false,
      petOwnership: "",
      petType: "",
    },
    onlineUsers: [],
    status: "idle", // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {
    setProfile: (state, action) => {
      state.profile = { ...state.profile, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.profile = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(getProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.profile = action.payload;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(getOnlineUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getOnlineUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.onlineUsers = action.payload;
      })
      .addCase(getOnlineUsers.rejected, (state, action) => {
        state.status = "failed>>>>";
        state.error = action.payload;
      });
  },
});

export const { setProfile } = profileSlice.actions;
export default profileSlice.reducer;