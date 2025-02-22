import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.js";
import resetReducer from "./resetSlice.js";
import profileReducer from "./profileSlice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    reset: resetReducer,
    profile:profileReducer,
  },
});


export default store;
