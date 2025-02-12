import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box, FormControlLabel, Checkbox } from "@mui/material";
import {Link} from 'react-router-dom'
import Navigation from "../components/Nav.jsx";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div style={{width:"100vw", margin:"auto", background:"#f7f7f7"}}>
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
        <form onSubmit={handleLogin}>
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
          >
            Sign In
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
