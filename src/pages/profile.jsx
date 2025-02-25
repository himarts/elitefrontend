import { useState, useEffect } from "react";
import { Container, Card, CardContent, TextField, CardMedia, Typography, Button, Grid, Divider, Badge, Avatar, IconButton, List, ListItem, ListItemText, Snackbar } from "@mui/material";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaEdit, FaHeart, FaGlobe, FaCamera, FaComments, FaUsers, FaCircle, FaThumbsUp, FaThumbsDown, FaComment, FaFlag } from "react-icons/fa";
import ChatWindow from "../components/chat";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/authSlice";
import { useNavigate } from "react-router-dom";
import { checkProfileCompletion } from "../features/authSlice.js";
import { likeProfile, dislikeProfile, getDislikedUsers, getLikedUsers } from '../features/LikesDisplikesSlice.js';
import { getOnlineUsers } from "../features/profileSlice.js";
import axios from "axios";
import UserProfileModal from "../components/modal.jsx";
import Header from "../components/Header";

const friends = [
  { name: "Alice Smith", online: true },
  { name: "Bob Johnson", online: false },
  { name: "Charlie Brown", online: true },
  { name: "Diana Miller", online: false }
];

function UserProfile() {
  const [likedUsers, setLikedUsers] = useState({});
  const [dislikedUsers, setDislikedUsers] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openChat, setOpenChat] = useState(false);
  const [messages, setMessages] = useState({});
  const [notification, setNotification] = useState({ open: false, message: "" });
  const [notificationCount, setNotificationCount] = useState(2); // Example notification count

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isProfileComplete } = useSelector((state) => state?.auth);
  const { onlineUsers } = useSelector((state) => state?.profile);
  const { allLikedUsers, allDislikedUsers } = useSelector((state) => state?.likesDislikes);

  useEffect(() => {
    dispatch(checkProfileCompletion());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getOnlineUsers());
    dispatch(getLikedUsers());
    dispatch(getDislikedUsers());
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
        `http://localhost:9000/api/notification/send-like-notification/${likedId}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setNotification({ open: true, message: "User has been notified of your like!" });
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
        `http://localhost:9000/api/notification/send-dislike-notification/${dislikedId}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setNotification({ open: true, message: "User has been notified of your dislike!" });
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
          <Grid container spacing={2} alignItems="center" justifyContent="space-between">
            <Grid item xs={12} md={4}>
              <CardMedia
                component="img"
                height="250"
                image="https://randomuser.me/api/portraits/men/1.jpg"
                alt="User Profile"
                style={{ borderRadius: "15px", width: "100%", maxWidth: "250px" }}
              />
              <Button variant="contained" component="label" style={{ marginTop: "10px", backgroundColor: "#ff3366", color: "white" }} startIcon={<FaCamera />}>
                Change Photo
                <input type="file" hidden />
              </Button>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="h3" style={{ fontWeight: "bold" }}>John Doe</Typography>
              <Typography variant="body1"><FaEnvelope style={{ marginRight: "10px" }} /> johndoe@example.com</Typography>
              <Typography variant="body1"><FaPhone style={{ marginRight: "10px" }} /> +1 234 567 890</Typography>
              <Typography variant="body1"><FaMapMarkerAlt style={{ marginRight: "10px" }} /> New York, USA</Typography>
              <Typography variant="body1"><FaGlobe style={{ marginRight: "10px" }} /> Looking for: Serious Relationship</Typography>
              <Typography variant="body1"><FaHeart style={{ marginRight: "10px" }} /> Interests: Hiking, Traveling, Music</Typography>
              <Button variant="contained" style={{ backgroundColor: "#ff3366", color: "white", marginTop: "15px" }} startIcon={<FaEdit />}>
                Edit Profile
              </Button>
            </Grid>
          </Grid>

          <Divider style={{ margin: "20px 0" }} />
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Typography variant="h5" style={{ marginBottom: "10px", fontWeight: "bold" }}>Friends</Typography>
              <List>
                {friends.map((friend, index) => (
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
                {onlineUsers.map((user, index) => (
                  <Grid item key={index} xs={6} sm={4} md={3}>
                    <Card style={{ padding: "10px", textAlign: "center", cursor: "pointer" }} onClick={() => handleUserClick(user)}>
                      <Avatar src={user.image} style={{ margin: "auto" }} />
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