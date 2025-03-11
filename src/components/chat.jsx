import React, { useState, useEffect, useRef } from "react";
import { Avatar, Typography, Paper, IconButton, TextField } from "@mui/material";
import { FaTimes, FaPaperPlane } from "react-icons/fa";
import socket from "../utils/socket.js"; 
import axios from "axios";
import getUserIdFromToken from "../utils/decodeToken.js";

function ChatWindow({ user, onClose, messages, setMessages }) {
  const [messageInput, setMessageInput] = useState("");

  const chatContainerRef = useRef(null);
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    const handleReceiveMessage = (message) => {
      console.log("📩 Received message:", message);
  
      setMessages((prev) => ({
        ...prev,
        [message.senderId]: [
          ...(prev[message.senderId] || []),
          { text: message.message, sender: "them" },
        ],
      }));
      setTimeout(scrollToBottom, 100);
    };
  
    // ✅ Ensure only one event listener is active
    socket.off("receive-message", handleReceiveMessage);
    socket.on("receive-message", handleReceiveMessage);
  
    return () => {
      socket.off("receive-message", handleReceiveMessage);
    };
  }, [setMessages]);
  
  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await axios.get(`http://localhost:9000/api/chats/history/${user._id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setMessages((prev) => ({
          ...prev,
          [user._id]: response.data.map((msg) => ({
            text: msg.message,
            sender: msg.sender === getUserIdFromToken() ? "me" : "them",
          })),
        }));
        setTimeout(scrollToBottom, 100);
      } catch (error) {
        console.error("Error fetching chat history:", error);
      }
    };

    fetchChatHistory();

    return () => {
      socket.off("receive-message");
    };
  }, [user._id, setMessages]);

  const handleSendMessage = async () => {
    if (!messageInput.trim()) return;
  
    const message = {
      senderId: getUserIdFromToken(), 
      receiverId: user._id,
      message: messageInput,
    };
  
    try {
      await axios.post("http://localhost:9000/api/chats/send", message, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      setMessages((prev) => ({
        ...prev,
        [user._id]: [...(prev[user._id] || []), { text: messageInput, sender: "me" }],
      }));
  
      socket.emit("send-message", message); 

      setMessageInput("");
      setTimeout(scrollToBottom, 100);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Paper style={{ position: "fixed", bottom: "50px", right: "20px", width: "300px", height: "400px",
      backgroundColor: "#fff", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", borderRadius: "10px"
    }}>
      <div style={{ display: "flex", alignItems: "center", padding: "10px", backgroundColor: "#4caf50", color: "white", borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}>
        <Avatar src={user.profilePicture} style={{ marginRight: "10px" }} />
        <Typography variant="body1">{user.name}</Typography>
        <IconButton style={{ marginLeft: "auto", color: "white" }} onClick={onClose}>
          <FaTimes />
        </IconButton>
      </div>

      <div ref={chatContainerRef} style={{ padding: "10px", height: "280px", overflowY: "auto", display: "flex", flexDirection: "column" }}>
        {messages[user._id]?.length > 0 ? (
          messages[user._id].map((msg, index) => (
            <div key={index} style={{
              display: "flex",
              justifyContent: msg.sender === "me" ? "flex-end" : "flex-start", // Align left or right
              marginBottom: "5px",
            }}>
              <div
                style={{
                  maxWidth: "80%",
                  padding: "6px 10px",
                  borderRadius: "10px",
                  backgroundColor: msg.sender === "me" ? "#ff3366" : "rgb(149 131 131", // Different colors
                  color: msg.sender === "me" ? "#fff" : "#fff",
                }}
              >
                <Typography variant="body2">{msg.text}</Typography>
              </div>
            </div>
          ))
        ) : (
          <Typography variant="body2" style={{ textAlign: "center", marginTop: "20px" }}>
            No messages yet
          </Typography>
        )}
      </div>

      <div style={{ display: "flex", padding: "10px" }}>
        <TextField
          fullWidth
          size="small"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <IconButton color="primary" onClick={handleSendMessage}>
          <FaPaperPlane />
        </IconButton>
      </div>
    </Paper>
  );
}

export default ChatWindow;