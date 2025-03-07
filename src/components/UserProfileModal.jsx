import React from "react";
import { Dialog, DialogTitle, DialogContent, Avatar, Typography, Divider, Button } from "@mui/material";
import { FaComment, FaFlag } from "react-icons/fa";
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

const UserProfileModal = ({ open, user, onClose, onOpenChat }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      {user && (
        <>
          <DialogTitle style={{ textAlign: "center", fontWeight: "bold" }}>User Profile</DialogTitle>
          <DialogContent style={{ textAlign: "center" }}>
            <Zoom>
              <Avatar
                src={user.profilePicture}
                style={{ margin: "auto", width: "120px", height: "120px", cursor: "pointer" }}
              />
            </Zoom>
            <Typography variant="h6" style={{ fontWeight: "bold", marginTop: "10px" }}>{user.name}, {user.age}</Typography>
            <Typography variant="body2" style={{ color: "gray" }}>{user.location}</Typography>
            <Typography variant="body2" style={{ color: user.lastSeen === "Online now" ? "green" : "gray" }}>Last seen: {user.lastSeen}</Typography>
            <Divider style={{ margin: "15px 0" }} />
            <Button variant="contained" style={{ backgroundColor: "#4caf50", color: "white", margin: "10px" }} startIcon={<FaComment />} onClick={onOpenChat}>
              Chat
            </Button>
            <Button variant="contained" style={{ backgroundColor: "#ff3366", color: "white", margin: "10px" }} startIcon={<FaFlag />}>
              Report
            </Button>
            <Divider style={{ margin: "15px 0" }} />
            <Button onClick={onClose} color="secondary">Close</Button>
          </DialogContent>
        </>
      )}
    </Dialog>
  );
};

export default UserProfileModal;