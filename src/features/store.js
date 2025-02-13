import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.js";
import resetReducer from "./resetSlice.js";
const store = configureStore({
  reducer: {
    auth: authReducer,
    reset: resetReducer,
  },
});


export default store;
