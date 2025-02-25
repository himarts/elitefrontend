import React from "react";
import { AppBar, Toolbar, TextField, Typography, IconButton, Badge, Button } from "@mui/material";
import { FaComments, FaHeart, FaBell, FaSignOutAlt } from "react-icons/fa";

const Header = ({ handleLogout, notificationCount }) => {
  return (
    <AppBar position="static" style={{ backgroundColor: "#ff3366", width: "100%" }}>
      <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" style={{ fontWeight: "bold" }}>EliteHarmony</Typography>
        <TextField variant="outlined" placeholder="Search..." size="small" style={{ backgroundColor: "white", borderRadius: "5px" }} />
        <div>
          <IconButton color="inherit">
            <Badge badgeContent={3} color="secondary">
              <FaComments size={20} />
            </Badge>
          </IconButton>
          <IconButton color="inherit">
            <Badge badgeContent={5} color="secondary">
              <FaHeart size={20} />
            </Badge>
          </IconButton>
          <IconButton color="inherit">
            <Badge badgeContent={notificationCount} color="secondary">
              <FaBell size={20} />
            </Badge>
          </IconButton>
          <Button variant="contained" style={{ backgroundColor: "#fff", color: "#ff3366", marginLeft: "10px" }} startIcon={<FaSignOutAlt />} onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;