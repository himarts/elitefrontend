import React, { useState, useEffect } from "react";
import { Container, TextField, Button, Typography , Box} from "@mui/material";
import { Link } from "react-router-dom";
import Navigation from "../components/Nav.jsx";
import {forgotPassword} from '../features/resetSlice.js';
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector} from "react-redux";


const ForgotPassword = () => {

  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { loading, error,success } = useSelector((state) => state?.reset);

  const handleSubmit = async (e) => {
    e.preventDefault();
   dispatch(forgotPassword(email));
    if (forgotPassword.fulfilled.match(result)) {
      toast.success("Reset code sent to your email");
    } else {
      toast.error(result.payload || "Error sending reset code");
    }
  };

   useEffect(() => {
      if (error) toast.error(error);
      if (success) {
        toast.success("Verification successful! Redirecting to password reset page");
        setTimeout(() => {
          navigate("/verify-reset-otp"); // Redirect to login page after success
        }, 2000);
      }
    }, [error, success, navigate]);

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
        
     
<Button
  type="submit"
  variant="contained"
  color="primary"
  fullWidth
  style={{ backgroundColor: "#ff3366" }}
  disabled={loading} // Disable button when loading
>
  {loading ? "Sending..." : "Send Reset Link"}
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
