import React, { useState } from "react";
import { Container, TextField, Button, Typography , Box} from "@mui/material";
import { Link } from "react-router-dom";
import Navigation from "../components/Nav.jsx";
import Footer from "../components/Footer.jsx";



const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Password reset link sent to:", email);
    alert("If this email is registered, a password reset link has been sent.");
  };

  return (
    <div style={{width:"100%", height:"100vh", margin:"auto", background:"#f7f7f7"}}>
        <Navigation />
    <Container maxWidth="sm" style={{ paddingTop: "150px", textAlign: "center" }}>
        <Box
        
        sx={{ 
            boxShadow:10, 
            p: 4, 
            borderRadius: 3, 
            bgcolor: "white" 
          }}>
      <Typography variant="h4" gutterBottom>Forgot Password</Typography>
      <Typography variant="body1" style={{ marginBottom: "20px" }}>
        Enter your email and we will send you a password reset link.
      </Typography>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <TextField 
          label="Email Address" 
          type="email" 
          variant="outlined" 
          fullWidth 
          required 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        
        <Button type="submit" variant="contained" color="primary" fullWidth style={{ backgroundColor: "#ff3366" }}>
          Send Reset Link
        </Button>
      </form>

      {/* Link to Login Page */}
      <Typography variant="body1" style={{ marginTop: "15px" }}>
        Remembered your password? <Link to="/login" style={{ color: "#ff3366", textDecoration: "none", fontWeight: "bold" }}>Login</Link>
      </Typography>
    </Box>
    </Container>

    {/* <Footer /> */}
    </div>
  );
};

export default ForgotPassword;
