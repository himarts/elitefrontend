import React, { useState } from "react";
import { Container, TextField, Button, Typography , Box} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navigation from "../components/Nav.jsx";
import Footer from "../components/Footer.jsx";



const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    console.log("New password set:", password);
    alert("Your password has been reset successfully!");
    navigate("/login");
  };

  return (
    <div style={{width:"100vw", margin:"auto", background:"#f7f7f7"}}>
      <Navigation />
    <Container maxWidth="sm" style={{ paddingTop: "50px", textAlign: "center" }}>
      <Box 
       sx={{ 
        boxShadow:10, 
        p: 4, 
        borderRadius: 3, 
        bgcolor: "white" 
      }}>
      <Typography variant="h4" gutterBottom>Reset Password</Typography>
      <Typography variant="body1" style={{ marginBottom: "20px" }}>
        Enter a new password for your account.
      </Typography>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <TextField 
          label="New Password" 
          type="password" 
          variant="outlined" 
          fullWidth 
          required 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />

        <TextField 
          label="Confirm Password" 
          type="password" 
          variant="outlined" 
          fullWidth 
          required 
          value={confirmPassword} 
          onChange={(e) => setConfirmPassword(e.target.value)} 
        />
        
        <Button type="submit" variant="contained" color="primary" fullWidth style={{ backgroundColor: "#ff3366" }}>
          Reset Password
        </Button>
      </form>
      </Box>
    </Container>
{/* <Footer /> */}
    </div>
  );
};

export default ResetPassword;
