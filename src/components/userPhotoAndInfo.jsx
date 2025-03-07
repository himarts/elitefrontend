import React, { useState, useEffect } from 'react';
import { Grid, CardMedia, Button, Typography, LinearProgress } from '@mui/material';
import { FaCamera, FaEnvelope, FaPhone, FaMapMarkerAlt, FaGlobe, FaHeart, FaEdit } from 'react-icons/fa';
import axios from 'axios';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

export default function UserPhotoAndInfo({ profile }) {
  const [image, setImage] = useState(profile?.profilePicture || "https://randomuser.me/api/portraits/men/1.jpg");
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setImage(profile?.profilePicture || "https://randomuser.me/api/portraits/men/1.jpg");
  }, [profile]);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('profilePicture', file);

      try {
        const token = localStorage.getItem("token");
        setUploading(true);
        const response = await axios.put('http://localhost:9000/api/profile/profile-picture', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setProgress(percentCompleted);
          },
        });
        if (response.data.success) {
          setImage(response.data.profilePicture);
          // Optionally, you can update the profile state with the new image URL
        }
      } catch (error) {
        console.error('Error uploading photo:', error);
      } finally {
        setUploading(false);
        setProgress(0);
      }
    }
  };

  return (
    <div>
      <Grid container spacing={2} alignItems="center" justifyContent="space-between">
        <Grid item xs={12} md={4}>
          <Zoom>
            <CardMedia
              component="img"
              height="250"
              image={image}
              alt="User Profile"
              style={{ borderRadius: "15px", width: "100%", maxWidth: "250px", cursor: "pointer" }}
            />
          </Zoom>
          <Button variant="contained" component="label" style={{ marginTop: "10px", backgroundColor: "#ff3366", color: "white" }} startIcon={<FaCamera />}>
            Change Photo
            <input type="file" hidden onChange={handleFileChange} />
          </Button>
          {uploading && <LinearProgress variant="determinate" value={progress} style={{ marginTop: "10px" }} />}
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="h3" style={{ fontWeight: "bold" }}>{profile?.name || "John Doe"}</Typography>
          <Typography variant="body1"><FaEnvelope style={{ marginRight: "10px" }} /> {profile?.email || "johndoe@example.com"}</Typography>
          <Typography variant="body1"><FaPhone style={{ marginRight: "10px" }} /> {profile?.phone || "+1 234 567 890"}</Typography>
          <Typography variant="body1"><FaMapMarkerAlt style={{ marginRight: "10px" }} /> {profile?.location || "New York, USA"}</Typography>
          <Typography variant="body1"><FaGlobe style={{ marginRight: "10px" }} /> {profile?.lookingFor || "Looking for: Serious Relationship"}</Typography>
          <Typography variant="body1"><FaHeart style={{ marginRight: "10px" }} /> {profile?.interests || "Interests: Hiking, Traveling, Music"}</Typography>
          <Button variant="contained" style={{ backgroundColor: "#ff3366", color: "white", marginTop: "15px" }} startIcon={<FaEdit />}>
            Edit Profile
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}