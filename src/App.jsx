import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Container } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import styles

import Home from './pages/HomePage.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import ResetPassword from './pages/ResetPassword.jsx';
import UserProfile from './pages/profile.jsx';
import OtpVerification from './pages/Opt.jsx';
import PrivateRoute from './components/privateRoute.jsx';
import ResetPasswordOtp from './pages/resetPasswordOtp.jsx';
import ProgressiveForm from './pages/ProfileProgress.jsx';
import axios from 'axios';


// const getLocation = async () => {
//   try {
//     const response = await axios.get("http://localhost:9000/api/get-location");
//     // const data = await response.json();
//     console.log("User Location:", response);
//   } catch (error) {
//     console.error("Error getting location:", error);
//   }
// };

// // Call this function when the page loads
// getLocation();


function App() {
  return (
    <Router>
      <Container style={{ }}>
        <ToastContainer position="top-right" autoClose={3000} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/verification-process" element={<OtpVerification />} />
          <Route path="/verify-reset-otp" element={<ResetPasswordOtp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/profile-progress" element={<ProgressiveForm />} />

          <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<UserProfile />} />


          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        </Route>

        </Routes>
      </Container>
    </Router>
  );
}

export default App;
              