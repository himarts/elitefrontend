import React, { useState, useEffect } from "react";
import { Container, TextField, Button, Typography,Box } from "@mui/material";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Navigation from "../components/Nav";
import  {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { registerUser } from "../features/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState("");
  const dispatch = useDispatch();
  const { error, loading, user } = useSelector(state => state?.auth);
  const navigate = useNavigate()
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const handlePhoneChange = (value) => {
    setFormData({ ...formData, phone: value });
  };


  useEffect(() => {
    if (error) {
      toast.error(error?.error);
    }
  }, [error]); // Runs whenever `error` changes

  useEffect(() => {
    if (user) {
      toast.success("Registration successful!");
      navigate("/verification-process")
    }
  }, [user]);

  const handleSubmit = (event) => {
    event.preventDefault();
   dispatch(registerUser(formData));


  };

  return (
   <div  style={{width: "100%", margin:"auto", background:"#f7f7f7"}}>
    <Navigation />
     <Container maxWidth="xs" style={{ paddingTop: "140px", textAlign: "center" }}>
     <Box 
        sx={{ 
          boxShadow:10, 
          p: 4, 
          borderRadius: 3, 
          bgcolor: "white" 
        }}
      >
      <Typography variant="h5" gutterBottom style ={{marginBottom:"20px"}}>Welcome to Harmony</Typography>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <TextField label="Full Name" name="name" variant="outlined" fullWidth onChange={handleChange} required />
        <TextField label="Email" name="email" type="email" variant="outlined" fullWidth onChange={handleChange} required />
        
        <PhoneInput 
          country={"us"} 
          value={formData.phone} 
          onChange={handlePhoneChange} 
          inputStyle={{ width: "100%", height: "56px" }} 
        />
        
        <TextField label="Password" name="password" type="password" variant="outlined" fullWidth onChange={handleChange} required />
        
        <Button type="submit"  disabled={loading}variant="contained" color="primary" fullWidth style={{ backgroundColor: "#ff3366" }}>
        {loading ? "Registering..." : "Register"}
        </Button>
      </form>
            {/* Link to Login Page */}
            <Typography variant="body1" style={{ marginTop: "15px" }}>
        Already have an account? <Link to="/login" style={{ color: "#ff3366", textDecoration: "none", fontWeight: "bold" }}>Login</Link>
      </Typography>
      </Box>
    </Container>
   </div>
  );
};

export default Register;
