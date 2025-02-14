import React, { useState, useEffect } from "react";
import { Container, TextField, Button, Typography , Box} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navigation from "../components/Nav.jsx";
import { resetPasswordd } from "../features/resetSlice.js";
import { logout } from "../features/authSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";



const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state?.reset);

const handleSubmit = (event) => {
  event.preventDefault();

  if (password !== confirmPassword) {
    toast.error("Passwords do not match!");
    return;
  }

  // Retrieve token from localStorage
  const token = localStorage.getItem("token"); // Ensure you store it as "resetToken" when generating

  if (!token) {
    toast.error("Reset token is missing or expired!");
    return;
  }

  dispatch(resetPasswordd({ newPassword: password, token })); // Pass as an object
};

   // Show success or error messages
   useEffect(() => {
      if (error) toast.error(error);
      if (success===true) {
        toast.success("Verification successful! Redirecting to login...");
        dispatch(logout()); 
        setTimeout(() => {
          navigate("/login"); // Redirect to login page after success
        }, 2000);
      }
    }, [error, success, navigate]);
  

  return (
    <div style={{width:"100%", margin:"auto", background:"#f7f7f7"}}>
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
