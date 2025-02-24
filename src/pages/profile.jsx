import { useState, useEffect  } from "react";
import { AppBar, Toolbar, Container, Card, CardContent, Dialog, DialogTitle, DialogContent,TextField, CardMedia, Typography, Button, Grid, Divider, Badge, Avatar, IconButton, List, ListItem, ListItemText } from "@mui/material";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaEdit, FaHeart, FaGlobe, FaCamera, FaBell, FaComments, FaUsers, FaCircle, FaThumbsUp, FaThumbsDown, FaSignOutAlt, FaComment, FaFlag  } from "react-icons/fa";
import ChatWindow from "../components/chat";
import { useDispatch, useSelector } from "react-redux";
 import { logout } from "../features/authSlice";
import { useNavigate } from "react-router-dom";
import { checkProfileCompletion } from "../features/authSlice.js";
import {likeProfile, dislikeProfile} from '../features/LikesDisplikesSlice.js';

const friends = [
  { name: "Alice Smith", online: true },
  { name: "Bob Johnson", online: false },
  { name: "Charlie Brown", online: true },
  { name: "Diana Miller", online: false }
];

const onlineUsers = [
  {id: 1, name: "Emily Clark",lastSeen: "4 hours ago", image: "https://randomuser.me/api/portraits/women/2.jpg", age: 28, location: "Los Angeles" },
  {id: 2, name: "Michael Scott",lastSeen: "2 hours ago", image: "https://randomuser.me/api/portraits/men/3.jpg", age: 35, location: "Scranton" },
  {id: 3, name: "Sarah Wilson",lastSeen: "5 hours ago", image: "https://randomuser.me/api/portraits/women/4.jpg", age: 30, location: "New York" },
  {id: 4, name: "David Lee", lastSeen: "2 min ago",image: "https://randomuser.me/api/portraits/men/5.jpg", age: 32, location: "Chicago" },
  {id: 5, name: "Olivia Martinez",lastSeen: "2 hours ago", image: "https://randomuser.me/api/portraits/women/6.jpg", age: 26, location: "Miami" },
  {id: 6, name: "James Anderson", lastSeen: "1 hour ago",image: "https://randomuser.me/api/portraits/men/7.jpg", age: 29, location: "Seattle" },
  { id: 7,name: "Sophia Roberts",lastSeen: "2 hours ago", image: "https://randomuser.me/api/portraits/women/8.jpg", age: 31, location: "Boston" }
];

function UserProfile() {

    const [likedUsers, setLikedUsers] = useState({});
    const [dislikedUsers, setDislikedUsers] = useState({});
    const [selectedUser, setSelectedUser] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [openChat, setOpenChat] = useState(false);
    const [messages, setMessages] = useState({});
    
console.log(likedUsers, ">>>>>>>>>>>>")
    const dispatch = useDispatch();
    const navigate = useNavigate();
//check profile complete
  const { isProfileComplete } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkProfileCompletion());
  }, [dispatch]);
  
    const handleLogout = () => {
      dispatch(logout())
      navigate("/login", { replace: true }); // Redirect to login

    };

    const handleUserClick = (user) => {
        setSelectedUser(user);
        setOpenModal(true);
      };

      const handleLikes = (event, user) => {
        console.log(user)
        event.stopPropagation();
        setLikedUsers((prev) => ({
          ...prev,
          [user.id]: true, // Mark user as liked
        }));
        setDislikedUsers((prev) => ({
          ...prev,
          [user.id]: false, // Remove dislike if previously disliked
        }));
        dispatch(likeProfile({ profileId: user.id }));
      };

      
      const handleDislikes = (event, user) => {
        event.stopPropagation();
        setDislikedUsers((prev) => ({
          ...prev,
          [user.id]: true, // Mark user as disliked
        }));
        setLikedUsers((prev) => ({
          ...prev,
          [user.id]: false, // Remove like if previously liked
        }));
        dispatch(dislikeProfile({ profileId: user.id }));
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

    
  
    return (
      <div style={{ width: "100%" }}>
        <AppBar position="static" style={{ backgroundColor: "#ff3366", width:"100%"}}>
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
                <Badge badgeContent={2} color="secondary">
                  <FaBell size={20} />
                </Badge>
              </IconButton>
              <Button variant="contained" style={{ backgroundColor: "#fff", color: "#ff3366", marginLeft: "10px" }} startIcon={<FaSignOutAlt />} onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </Toolbar>
        </AppBar>
        {!isProfileComplete && (
  <div style={{ background: "yellow", padding: "10px", textAlign: "center", borderRadius: "0px 0px 10px 10px" , opacity:"0.7"}}>
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
                    <ListItem key={index} >
                      <FaCircle style={{ color: friend.online ? "green" : "gray", marginRight: "10px" }} />
                      <ListItemText primary={friend.name}  onClick={() => handleUserClick(friend)}  style={{ cursor: "pointer" }}/>
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
                          <IconButton color="primary"
                           onClick={(event) => handleLikes(event, user)}
                           disabled={likedUsers[user.id]} // Disable if liked
                           >
                            <FaThumbsUp style={{ color: likedUsers[user.id] ? "gray" : "blue", fontSize:"18px" }}/>
                          </IconButton>
                          <IconButton 
                          color="secondary"
                           onClick={(event) => handleDislikes(event, user)}
                           disabled={dislikedUsers[user.id]} // Disable if disliked
                           >
                            <FaThumbsDown style={{ color: dislikedUsers[user.id] ? "gray" : "red", fontSize:"18px" }}/>
                          </IconButton>
                        </div>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Card>

            {/* User Profile Modal */}
      <Dialog open={openModal} onClose={handleCloseModal} fullWidth maxWidth="sm">
        {selectedUser && (
          <>
            <DialogTitle style={{ textAlign: "center", fontWeight: "bold" }}>User Profile</DialogTitle>
            <DialogContent style={{ textAlign: "center" }}>
              <Avatar src={selectedUser.image} style={{ margin: "auto", width: "120px", height: "120px" }} />
              <Typography variant="h6" style={{ fontWeight: "bold", marginTop: "10px" }}>{selectedUser.name}, {selectedUser.age}</Typography>
              <Typography variant="body2" style={{ color: "gray" }}>{selectedUser.location}</Typography>
              <Typography variant="body2" style={{ color: selectedUser.lastSeen === "Online now" ? "green" : "gray" }}>Last seen: {selectedUser.lastSeen}</Typography>
              <Divider style={{ margin: "15px 0" }} />
              <Button variant="contained" style={{ backgroundColor: "#4caf50", color: "white", margin: "10px" }} startIcon={<FaComment />} onClick={handleOpenChat}>
                Chat
              </Button>
              <Button variant="contained" style={{ backgroundColor: "#ff3366", color: "white", margin: "10px" }} startIcon={<FaFlag />}>
                Report
              </Button>
              <Divider style={{ margin: "15px 0" }} />
              <Button onClick={handleCloseModal} color="secondary">Close</Button>
            </DialogContent>
          </>
        )}
      </Dialog>


      {openChat && selectedUser && (
        <ChatWindow user={selectedUser} onClose={handleCloseChat} messages={messages} setMessages={setMessages} />
      )}
        </Container>
      </div>
    );
  }
  

export default UserProfile;
