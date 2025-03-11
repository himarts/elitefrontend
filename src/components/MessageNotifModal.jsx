import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Badge,
  CircularProgress,
  Button,
} from "@mui/material";
import { FaTimes, FaEnvelopeOpenText } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchUnreadMessages, markMessagesAsRead, markAllMessagesAsRead } from "../features/messageSlice";

const MessageNotificationModal = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const { unreadCount, status, notifications } = useSelector((state) => state.messages);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (open) {
      dispatch(fetchUnreadMessages()).finally(() => setLoading(false));
    }
  }, [open, dispatch]);

  const handleMarkAsRead = async (messageId) => {
    await dispatch(markMessagesAsRead(messageId));
    dispatch(fetchUnreadMessages()); // Refresh unread messages
  };

  const handleClearAll = async () => {
    setLoading(true);
    await dispatch(markAllMessagesAsRead());
    dispatch(fetchUnreadMessages()).finally(() => setLoading(false));
  };

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="message-notifications">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 150,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 3,
          borderRadius: 2,
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Message Notifications
          </Typography>
          <IconButton onClick={handleClose}>
            <FaTimes />
          </IconButton>
        </Box>

        {loading ? (
          <Box display="flex" justifyContent="center" mt={2}>
            <CircularProgress />
          </Box>
        ) : notifications?.length === 0 ? (
          <Typography mt={2} textAlign="center" color="text.secondary">
            No new messages.
          </Typography>
        ) : (
          <>
            <List>
              {notifications.map((msg) => (
                <ListItem
                  key={msg.id}
                  secondaryAction={
                    <IconButton
                      edge="end"
                      onClick={() => handleMarkAsRead(msg.id)}
                      color="primary"
                    >
                      <FaEnvelopeOpenText />
                    </IconButton>
                  }
                >
                  <ListItemText
                 sx={{ fontSize: "9px", fontWeight: 500 }}// Reduced font size
                    primary={`${msg.name}: ${msg.content.substring(0, 30)}...`}
                    secondary={new Date(msg.timestamp).toLocaleString()}
                  />
                  {!msg.read && (
                    <Badge color="error" variant="dot" sx={{ ml: 1 }} />
                  )}
                </ListItem>
              ))}
            </List>
            <Box display="flex" justifyContent="center" mt={2}>
              <Button variant="contained" color="primary" onClick={handleClearAll}>
                Clear All
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default MessageNotificationModal;