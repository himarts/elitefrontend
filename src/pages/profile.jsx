import { useState, useEffect } from "react";
import { Container, Card, Divider, Grid, List, ListItem, ListItemText, Snackbar, Typography, IconButton, Avatar } from "@mui/material";
import { FaCircle, FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import ChatWindow from "../components/chat";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/authSlice";
import { useNavigate } from "react-router-dom";
import { checkProfileCompletion } from "../features/authSlice.js";
import { likeProfile, dislikeProfile, getDislikedUsers, getLikedUsers } from '../features/LikesDisplikesSlice.js';
import { getOnlineUsers, getProfile, getFriends } from "../features/profileSlice.js";
import axios from "axios";
import UserProfileModal from "../components/UserProfileModal";
import Header from "../components/Header";
import socket from "../utils/socket";
import UserPhotoAndInfo from "../components/UserPhotoAndInfo";

function UserProfile() {
  const [likedUsers, setLikedUsers] = useState({});
  const [dislikedUsers, setDislikedUsers] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openChat, setOpenChat] = useState(false);
  const [messages, setMessages] = useState({});
  const [notification, setNotification] = useState({ open: false, message: "" });
  const [notificationCount, setNotificationCount] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isProfileComplete, user } = useSelector((state) => state?.auth);
  const { onlineUsers, profile, friends } = useSelector((state) => state?.profile);
  const { allLikedUsers, allDislikedUsers } = useSelector((state) => state?.likesDislikes);
  useEffect(() => {
    dispatch(checkProfileCompletion());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getOnlineUsers());
    dispatch(getLikedUsers());
    // dispatch(getDislikedUsers());
    dispatch(getProfile());
    // dispatch(getFriends());
  }, [dispatch]);

  useEffect(() => {
    const likedUsersMap = allLikedUsers.reduce((acc, user) => {
      acc[user._id] = true;
      return acc;
    }, {});
    setLikedUsers(likedUsersMap);
  }, [allLikedUsers]);

  useEffect(() => {
    const dislikedUsersMap = allDislikedUsers.reduce((acc, user) => {
      acc[user._id] = true;
      return acc;
    }, {});
    setDislikedUsers(dislikedUsersMap);
  }, [allDislikedUsers]);

  useEffect(() => {
    socket.on("receiveNotification", (data) => {
      setNotificationCount((prevCount) => prevCount + 1);
      setNotification({ open: true, message: data.message });
    });
  
    return () => {
      socket.off("receiveNotification");
    };
  }, []);
  
  

  

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login", { replace: true }); // Redirect to login
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setOpenModal(true);
  };

  const handleLikes = async (event, user) => {
    if (!user?._id) return;
    event.stopPropagation();

    setLikedUsers((prev) => {
      const isAlreadyLiked = prev[user._id];

      return {
        ...prev,
        [user._id]: !isAlreadyLiked, // Toggle like status
      };
    });

    setDislikedUsers((prev) => ({
      ...prev,
      [user._id]: false, // Remove dislike if user is liked
    }));

    dispatch(likeProfile({ profileId: user._id }));

    // Send like notification
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No authentication token found");

      const likedId = user._id;

      const response = await axios.post(
        // `http://localhost:9000/api/notification/send-like-notification/${likedId}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
console.log(response)
      if (response.data.success) {
        socket.emit("sendNotification", {
          receiverId: likedId,
          message: "Someone liked your profile!",
        });
      }
    } catch (error) {
      console.error("Error sending like notification:", error);
    }
  };

  const handleDislikes = async (event, user) => {
    if (!user?._id) return;
    event.stopPropagation();

    setDislikedUsers((prev) => {
      const isAlreadyDisliked = prev[user._id];

      return {
        ...prev,
        [user._id]: !isAlreadyDisliked, // Toggle dislike status
      };
    });

    setLikedUsers((prev) => ({
      ...prev,
      [user._id]: false, // Remove like if user is disliked
    }));

    dispatch(dislikeProfile({ profileId: user._id }));

    // Send dislike notification
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No authentication token found");

      const dislikedId = user._id;

      const response = await axios.post(
        // `http://localhost:9000/api/notification/send-dislike-notification/${dislikedId}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
console.log(response)
      if (response.data.success) {
        socket.emit("sendNotification", {
          receiverId: dislikedId,
          message: "Someone disliked your profile!",
        });
      }
    } catch (error) {
      console.error("Error sending dislike notification:", error);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedUser(null);
  };

  const handleOpenChat = () => {
    setOpenModal(false);
    setOpenChat(true);
  };

  const handleCloseChat = () => {
    setOpenChat(false);
  };

  const handleCloseNotification = () => {
    setNotification({ open: false, message: "" });
  };

  const handleUpdateProfilePicture = (newProfilePicture) => {
    setUpdatedProfile((prevProfile) => ({
      ...prevProfile,
      profilePicture: newProfilePicture,
    }));
  };

  // Filter out the logged-in user from the list of online users
  const filteredOnlineUsers = onlineUsers.filter((onlineUser) => onlineUser._id !== user?._id);

  return (
    <div style={{ width: "100%" }}>
      <Header handleLogout={handleLogout} notificationCount={notificationCount} />
      {!isProfileComplete && (
        <div style={{ background: "yellow", padding: "10px", textAlign: "center", borderRadius: "0px 0px 10px 10px", opacity: "0.7" }}>
          Your profile is incomplete! Please complete your profile.
          <button
            onClick={() => navigate("/profile-progress")}
            style={{ color: "white", fontWeight: "bold" }}
          >
            Complete Now
          </button>
        </div>
      )}

      <Container style={{ display: "flex", justifyContent: "center", flexDirection: "column", width: "100vw", margin: "auto" }}>
        <Card style={{ textAlign: "center", padding: "20px", borderRadius: "15px", width: "90%", backgroundColor: "#f0f2f5", margin: "auto" }}>
          <UserPhotoAndInfo profile={profile} />
          <Divider style={{ margin: "20px 0" }} />
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Typography variant="h5" style={{ marginBottom: "10px", fontWeight: "bold" }}>Friends</Typography>
              <List>
                {Array.isArray(friends) && friends?.map((friend, index) => (
                  <ListItem key={index}>
                    <FaCircle style={{ color: friend.online ? "green" : "gray", marginRight: "10px" }} />
                    <ListItemText primary={friend.name} onClick={() => handleUserClick(friend)} style={{ cursor: "pointer" }} />
                  </ListItem>
                ))}
              </List>
            </Grid>

            <Grid item xs={12} md={8}>
              <Typography variant="h5" style={{ marginBottom: "10px", fontWeight: "bold" }}>Online Users</Typography>
              <Grid container spacing={2}>
                {filteredOnlineUsers.map((user, index) => (
                  <Grid item key={index} xs={6} sm={4} md={3}>
                    <Card style={{ padding: "10px", textAlign: "center", cursor: "pointer" }} onClick={() => handleUserClick(user)}>
                      <Avatar src={user?.profilePicture} style={{ margin: "auto" }} />
                      <Typography variant="body2" style={{ marginTop: "5px" }}>{user.name}</Typography>
                      <Typography variant="body2" style={{ marginTop: "5px", color: "gray" }}>{user.age} | {user.location}</Typography>
                      <div style={{ marginTop: "5px", display: "flex", justifyContent: "center" }}>
                        <IconButton
                          color="primary"
                          onClick={(event) => handleLikes(event, user)}
                          disabled={likedUsers[user._id]} // Disable if liked
                        >
                          <FaThumbsUp
                            style={{
                              color: likedUsers[user._id] ? "gray" : "blue",
                              fontSize: "18px",
                            }}
                          />
                        </IconButton>
                        <IconButton
                          color="secondary"
                          onClick={(event) => handleDislikes(event, user)}
                          disabled={dislikedUsers[user._id]} // Disable if disliked
                        >
                          <FaThumbsDown
                            style={{
                              color: dislikedUsers[user._id] ? "gray" : "red",
                              fontSize: "18px",
                            }}
                          />
                        </IconButton>
                      </div>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Card>

        {openChat && selectedUser && (
          <ChatWindow user={selectedUser} onClose={handleCloseChat} messages={messages} setMessages={setMessages} />
        )}
      </Container>

      <UserProfileModal
        open={openModal}
        user={selectedUser}
        onClose={handleCloseModal}
        onOpenChat={handleOpenChat}
      />

      {/* Notification Snackbar */}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        message={notification.message}
      />
    </div>
  );
}

export default UserProfile;