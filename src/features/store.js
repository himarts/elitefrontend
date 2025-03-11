import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.js";
import resetReducer from "./resetSlice.js";
import profileReducer from "./profileSlice.js";
import likesDislikesReducer from './LikesDisplikesSlice.js';
import messageReducer  from "./measageSlice.js";
import notificationReducer from "./notificationSlice.js";
const store = configureStore({
  reducer: {
    auth: authReducer,
    reset: resetReducer,
    profile:profileReducer,
    likesDislikes: likesDislikesReducer,
    messages: messageReducer,
    notifications: notificationReducer
  },
});


export default store;
