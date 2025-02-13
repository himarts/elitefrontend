import { useState } from "react";
import { AppBar, Toolbar, Typography, Button,  IconButton, Menu, MenuItem, } from "@mui/material";
import {  FaBars } from "react-icons/fa";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Link, useNavigate} from 'react-router-dom';

 export default function Navigation() {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
  
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
   return (
     <div>
             <AppBar position="fixed" style={{ background: "#ff3366", boxShadow: "none" }}>
             <Toolbar>
         <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: "bold", marginRight:"40%"}}>
         <Link to="/" style={{fontSize:"23px"}}>❤️ EliteHarmony</Link>  
         </Typography>
       
         {/* Hamburger Menu (Visible on Small Screens) */}
         <IconButton
           edge="end"
           color="inherit"
           onClick={handleMenuOpen}
           sx={{ display: { xs: "block", md: "none" } }} 
         >
           <FaBars size={24} />
         </IconButton>
       
         {/* Dropdown Menu (For Small Screens) */}
         <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
           <MenuItem onClick={handleMenuClose}><Link  to="/">Home</Link></MenuItem>
           <MenuItem onClick={handleMenuClose}>Features</MenuItem>
           <MenuItem onClick={handleMenuClose}>Testimonials</MenuItem>
           <MenuItem onClick={handleMenuClose}>FAQ</MenuItem>
           <MenuItem onClick={handleMenuClose}> <Link  to="/login">Sign In</Link></MenuItem>
           <MenuItem onClick={handleMenuClose}>
             <Button variant="contained" sx={{ backgroundColor: "pink", color: "blue", borderRadius: "20px" }}>
           
             <Link  to="/signup"> Join Now</Link>
             </Button>
           </MenuItem>
         </Menu>
       
         {/* Normal Navigation (Hidden on Small Screens) */}
         <div  style={{ display: "flex", gap: "10px" }} sx={{ display: { xs: "none", md: "block" } }}>
           <Button color="inherit"><Link  to="/">Home</Link></Button>
           <Button color="inherit">Features</Button>
           <Button color="inherit">Testimonials</Button>
           <Button color="inherit">FAQ</Button>
           <Button color="inherit"><Link  to="/login">Sign In</Link></Button>
           <Button variant="contained" sx={{ backgroundColor: "pink", color: "blue", borderRadius: "20px" }}>
            
             <Link  to="/signup"> Join Now</Link>
           </Button>
         </div>
       </Toolbar>
             </AppBar>
       
     </div>
   );
 }
 