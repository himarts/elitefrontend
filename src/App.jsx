import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Container } from "@mui/material";

import Home from './pages/HomePage.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import ResetPassword from './pages/ResetPassword.jsx';
import UserProfile from './pages/profile.jsx';
function App() {
  return (
    <Router>
      <Container style={{ }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/profile" element={<UserProfile />} />

        </Routes>
      </Container>
    </Router>
  );
}

export default App;
