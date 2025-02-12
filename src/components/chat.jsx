import React, { useState } from "react";
import { Avatar, Typography, Paper, IconButton, TextField } from "@mui/material";
import { FaTimes, FaPaperPlane } from "react-icons/fa";

function ChatWindow({ user, onClose, messages, setMessages }) {
  const [messageInput, setMessageInput] = useState("");

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;

    setMessages((prev) => ({
      ...prev,
      [user.id]: [...(prev[user.id] || []), { text: messageInput, sender: "me" }],
    }));

    setMessageInput("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevents newline in input field
      handleSendMessage();
    }
  };

  return (
    <Paper style={{
      position: "fixed", bottom: "50px", right: "20px", width: "300px", height: "400px",
      backgroundColor: "#fff", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", borderRadius: "10px"
    }}>
      {/* Chat Header */}
      <div style={{ display: "flex", alignItems: "center", padding: "10px", backgroundColor: "#4caf50", color: "white", borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}>
        <Avatar src={user.image} style={{ marginRight: "10px" }} />
        <Typography variant="body1">{user.name}</Typography>
        <IconButton style={{ marginLeft: "auto", color: "white" }} onClick={onClose}>
          <FaTimes />
        </IconButton>
      </div>

      {/* Messages */}
      <div style={{ padding: "10px", height: "280px", overflowY: "auto" }}>
        {messages[user.id]?.map((msg, index) => (
          <div key={index} style={{ textAlign: msg.sender === "me" ? "right" : "left" }}>
            <Typography variant="body2" style={{
              backgroundColor: msg.sender === "me" ? "#dcf8c6" : "#eee",
              padding: "5px 10px", borderRadius: "10px", display: "inline-block", margin:"3px"
            }}>
              {msg.text}
            </Typography>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div style={{ display: "flex", padding: "-30px" }}>
        <TextField 
          fullWidth 
          size="small" 
          value={messageInput} 
          onChange={(e) => setMessageInput(e.target.value)} 
          onKeyDown={handleKeyDown} // 🔥 Listen for Enter key
        />
        <IconButton color="primary" onClick={handleSendMessage}>
          <FaPaperPlane />
        </IconButton>
      </div>
    </Paper>
  );
}

export default ChatWindow;
