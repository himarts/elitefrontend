import React, { useState, useEffect } from "react";
import { Container, TextField, Button, Typography, Box, FormControlLabel, Checkbox } from "@mui/material";
import {Link} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Navigation from "../components/Nav.jsx";
import { useNavigate } from "react-router-dom";
import {loginUser} from '../features/authSlice.js';
import getUserIdFromToken from '../utils/decodeToken.js'
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { loading, error } = useSelector((state) => state?.auth);
  let token = localStorage.getItem("token");
  const userId = getUserIdFromToken(); // Get userId from token
  // if (!userId) {
  //   console.error("User not authenticated");
  //   return;
  // }
  useEffect(() => {
    if (token) {
      navigate("/profile", { replace: true });
    }
  }, [token, navigate]);

  useEffect(() => {
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = () => {
   
      navigate("/profile", { replace: true });
    };
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }))
      .unwrap()
      .then(() => {
        toast.success("Login successful!");
        navigate("/profile", { replace: true });
      })
      .catch((err) => toast.error(err || "Login failed"));
  };

  return (
    <div style={{width:"100%", margin:"auto", background:"#f7f7f7", paddingTop:"80px"}}>
        <Navigation />
    <Container maxWidth="xs" style={{ paddingTop: "80px", textAlign: "center" }}>
      <Box 
        sx={{ 
          boxShadow:10, 
          p: 4, 
          borderRadius: 3, 
          bgcolor: "white" 
        }}
      >
        <Typography variant="h5" gutterBottom>Login</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <FormControlLabel
            control={<Checkbox color="primary" />}
            label="Remember Me"
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2, bgcolor: "#ff3366", color: "white", "&:hover": { bgcolor: "#e60050" } }}
            disabled={loading}
          >
          {loading ? "Logging in..." : "Login"}
          </Button>
          <Typography variant="body2" sx={{ mt: 2 }}>
            <Link to="/forgot-password" style={{ color: "#ff3366", textDecoration: "none" }}>Forgot Password?</Link>
          </Typography>
        </form>
      </Box>
    </Container>
    </div>
  );
};

export default Login;
