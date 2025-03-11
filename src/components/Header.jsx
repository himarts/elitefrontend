import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  TextField,
  Typography,
  IconButton,
  Badge,
  Button,
  Popover,
  List,
  ListItem,
  ListItemText
} from "@mui/material";
import axios from 'axios';
import { FaComments, FaHeart, FaBell, FaSignOutAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUnreadMessages } from "../features/measageSlice";
import { fetchUserNotifications, markNotificationAsRead } from "../features/notificationSlice";
import ChatWindow from "./chat";

const Header = ({ handleLogout, notificationCount }) => {
  const dispatch = useDispatch();
  const unreadMessages = useSelector((state) => state.messages.unreadCount);
  const notifications = useSelector((state) => state.notifications?.list || []);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationAnchor, setNotificationAnchor] = useState(null);
  const [openChatModal, setOpenChatModal] = useState(false); // Chat modal state
  const [selectedChatUser, setSelectedChatUser] = useState(null);
  const [messages, setMessages] = useState({});


  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUnreadMessages()); // Fetch unread messages
    dispatch(fetchUserNotifications()); // Fetch notifications
  }, [dispatch]);


  useEffect(() => {
    if (!selectedChatUser) return;

    const fetchChatHistory = async () => {
      try {
        const response = await axios.get(`http://localhost:9000/api/chats/history/${selectedChatUser._id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        setMessages((prev) => ({
          ...prev,
          [selectedChatUser._id]: response.data.map((msg) => ({
            text: msg.message,
            sender: msg.sender === localStorage.getItem("userId") ? "me" : "them",
          })),
        }));
      } catch (error) {
        console.error("Error fetching chat history:", error);
      }
    };

    fetchChatHistory();
  }, [selectedChatUser]);


  // **Handle Notification Click**
  const handleNotificationClick = (notification) => {
    dispatch(markNotificationAsRead(notification._id)); // Mark as read

    if (notification.type === "like" || notification.type === "dislike") {
      navigate(`/profile/${notification.senderId}`); // Navigate to profile
    } else if (notification.type === "message") {
      handleOpenChat(notification.sender); // Open chat with sender
    }

    handleClose(); // Close popover
  };

  // **Open Chat Modal**
  const handleOpenChat = (sender) => {
    if (!sender) return;

    setSelectedChatUser({
      _id: sender._id,
      name: sender.name,
      profilePicture: sender.profilePicture || "",
    });

    setOpenChatModal(true);
  };

  // **Handle Popover Open/Close**
  const handleOpen = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <AppBar position="static" style={{ backgroundColor: "#ff3366", width: "100%" }}>
        <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" style={{ fontWeight: "bold" }}>EliteHarmony</Typography>
          <TextField variant="outlined" placeholder="Search..." size="small" style={{ backgroundColor: "white", borderRadius: "5px" }} />
          <div>
            {/* MESSAGE ICON */}
            <IconButton color="inherit" onClick={handleOpen}>
              <Badge badgeContent={unreadMessages} color="secondary">
                <FaComments size={20} />
              </Badge>
            </IconButton>

            {/* MESSAGE NOTIFICATION MODAL (Popover) */}
            <Popover
              open={Boolean(anchorEl)}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              transformOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <List style={{ minWidth: "250px" }}>
                {notifications?.length > 0 ? (
                  notifications.map((msg, index) => (
                    <ListItem button key={index} onClick={() => handleNotificationClick(msg)}>
                      <ListItemText primary={`From: ${msg.sender?.name}`} secondary={msg.message} />
                    </ListItem>
                  ))
                ) : (
                  <ListItem>
                    <ListItemText primary="No new messages" />
                  </ListItem>
                )}
              </List>
            </Popover>

            {/* NOTIFICATION ICON */}
            <IconButton color="inherit" onClick={handleOpen}>
              <Badge badgeContent={notificationCount} color="error">
                <FaBell size={20} />
              </Badge>
            </IconButton>

            {/* LOGOUT BUTTON */}
            <Button
              variant="contained"
              style={{ backgroundColor: "#fff", color: "#ff3366", marginLeft: "10px" }}
              startIcon={<FaSignOutAlt />}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </Toolbar>
      </AppBar>

      {/* **CHAT WINDOW MODAL** */}
      {openChatModal && selectedChatUser && (
  <div 
    style={{
      position: "fixed",  // Keeps it over everything
      bottom: "20px",     // Adjust distance from bottom
      right: "20px",      // Adjust distance from right
      zIndex: 9999        // Ensure it stays above other elements
    }}
  >
   <ChatWindow
            user={selectedChatUser}
            onClose={() => {
              setOpenChatModal(false);
              setSelectedChatUser(null);
            }}
            messages={messages}
            setMessages={setMessages}
          />
  </div>
)}

    
    </>
  );
};

export default Header;
