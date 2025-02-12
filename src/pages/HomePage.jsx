import { useState } from "react";
import { AppBar, Toolbar, Typography, Button, Container, Grid, Card, CardContent, CardMedia, TextField, IconButton, Menu, MenuItem, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { FaHeart, FaUserCheck, FaVideo, FaComments, FaShieldAlt, FaMobileAlt, FaUsers, FaQuestionCircle, FaBars } from "react-icons/fa";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Link} from 'react-router-dom';
import Navigation from "../components/Nav.jsx";
import Footer from "../components/Footer.jsx";



const users = [
  { firstName: "Alice", lastName: "Smith", country: "USA", online: true, image: "https://randomuser.me/api/portraits/women/1.jpg" },
  { firstName: "Bob", lastName: "Johnson", country: "Canada", online: false, image: "https://randomuser.me/api/portraits/men/2.jpg" },
  { firstName: "Charlie", lastName: "Brown", country: "UK", online: true, image: "https://randomuser.me/api/portraits/men/3.jpg" },
  { firstName: "Diana", lastName: "Miller", country: "Australia", online: true, image: "https://randomuser.me/api/portraits/women/4.jpg" },
  { firstName: "Ethan", lastName: "Davis", country: "Germany", online: true, image: "https://randomuser.me/api/portraits/men/5.jpg" },
  { firstName: "Fiona", lastName: "Wilson", country: "France", online: true, image: "https://randomuser.me/api/portraits/women/6.jpg" }
];
function Home() {

return (
  <>
   <div style={{  minHeight: "100%", background: "#f7f7f7", color: "#333", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",    width: "100%", margin:"auto" }}>
<Navigation />
      <Container style={{ marginTop: "120px" }}>
        <Typography variant="h2" style={{ fontWeight: "bold", fontSize: "3rem" }}>Find Your Perfect Match</Typography>
        <Typography variant="h6" style={{ marginBottom: "20px", fontSize: "1.5rem" }}>Join the best dating community with verified profiles and AI matchmaking.</Typography>
        <TextField
          variant="outlined"
          placeholder="Enter your name"
          style={{ backgroundColor: "white", borderRadius: "5px", marginBottom: "10px", width: "300px" }}
        />
        <br />
        <Button variant="contained" style={{ backgroundColor: "#ff3366", color: "white", padding: "10px 30px", fontSize: "20px", borderRadius: "20px" }}>  <Link  to="/signup"> Join Now</Link></Button>
      </Container>

      <Container style={{ marginTop: "40px" }}>
        <Typography variant="h4" style={{ marginBottom: "20px", fontWeight: "bold" }}>Meet Our Members</Typography>
        <Grid container spacing={4} justifyContent="center">
          {users.map((user, index) => (
               <Grid item xs={12} sm={4} key={index}>
               <Card style={{ textAlign: "center", padding: "10px", borderRadius: "15px" }}>
                 <CardMedia component="img" height="150" width="100" image={user.image} alt={user.firstName} style={{ borderRadius: "10px", objectFit: "cover" }} />
                 <CardContent>
                   <Typography variant="h6">{user.firstName} {user.lastName}</Typography>
                   <Typography variant="body2">{user.country}</Typography>
                   <Typography variant="body2" style={{ color: user.online ? "green" : "red" }}>{user.online ? "Online" : "Offline"}</Typography>
                 </CardContent>
               </Card>
             </Grid>
          ))}
        </Grid>
      </Container>

      <Container style={{ marginTop: "40px" }}>
        <Typography variant="h4" style={{ marginBottom: "20px", fontWeight: "bold" }}>Features</Typography>
        <Grid container spacing={4} justifyContent="center">
          {[{ icon: FaHeart, title: "AI Matching", desc: "Get matched with compatible profiles using AI." },
            { icon: FaUserCheck, title: "Verified Profiles", desc: "Every profile is verified to ensure safety." },
            { icon: FaVideo, title: "Live Video Chat", desc: "Connect in real time with your matches." },
            { icon: FaComments, title: "Instant Messaging", desc: "Chat instantly with potential matches." },
            { icon: FaShieldAlt, title: "Privacy Protection", desc: "Keep your personal information secure." },
            { icon: FaMobileAlt, title: "Mobile App", desc: "Available on iOS and Android." }
          ].map((feature, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Card style={{ textAlign: "center", padding: "20px", borderRadius: "15px" }}>
                <feature.icon size={40} style={{ color: "#ff3366", marginBottom: "10px" }} />
                <CardContent>
                  <Typography variant="h5">{feature.title}</Typography>
                  <Typography>{feature.desc}</Typography>
                </CardContent>
              </Card>

            </Grid>
          ))}
        </Grid>
      </Container>

<Container  style={{marginTop:"60px", width:"40%"}}>
      <Accordion >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography><FaQuestionCircle /> How does AI Matching work?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>AI Matching uses machine learning algorithms to suggest compatible profiles based on your preferences and behavior.</Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion style={{marginTop:"20px"}}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography><FaQuestionCircle /> Is my data safe?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>Yes, we use advanced encryption to ensure that your data remains secure and private.</Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion style={{marginTop:"20px"}}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography><FaQuestionCircle /> How can I verify my profile?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>You can verify your profile by submitting a government-issued ID and a selfie for verification.</Typography>
            </AccordionDetails>
          </Accordion>
          </Container>
    <Footer />
    
    </div>
  </>
)
}

export default Home
