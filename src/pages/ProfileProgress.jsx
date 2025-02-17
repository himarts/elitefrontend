import React, { useState } from "react";
import {Box, Grid ,FormControlLabel, Checkbox, TextField, Button, Stepper, Step, StepLabel, MenuItem } from "@mui/material";import { FaUser, FaEnvelope, FaPhone, FaBirthdayCake, FaMapMarkerAlt } from "react-icons/fa";
import { MdWork, MdFavorite } from "react-icons/md";

const steps = ["Personal Information", "Matching Preferences", "Verification & Security", "Lifestyle & Interests", "Professional Details"];


const hobbiesOptions = ["Reading", "Traveling", "Cooking", "Sports", "Gaming", "Music", "Dancing", "Art"];
const interestsOptions = ["Fitness", "Technology", "Movies", "Nature", "Photography", "Science", "Fashion", "Politics"];
const languagesOptions = ["English", "Spanish", "French", "German", "Chinese", "Arabic", "Hindi", "Portuguese"];
const zodiacSigns = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces","Prefer not to say"];
const communicationStyles = ["Frequent Texter", "Occasional Texter", "Prefers Calls"];
const loveLanguages = ["Words of Affirmation", "Acts of Service", "Gifts", "Quality Time", "Physical Touch"];
const dietOptions = ["Vegan", "Vegetarian", "Pescatarian", "Omnivore", "Keto", "Halal", "Kosher"];
const smokingOptions = ["Smoker", "Non-smoker", "Social Smoker"];
const drinkingOptions = ["Non-drinker", "Social Drinker", "Regular Drinker"];
const workScheduleOptions = ["Full-time", "Part-time", "Freelancer", "Self-employed"];
const religionOptions = ["Christianity", "Islam", "Hinduism", "Buddhism", "Atheism", "Other"];
const socialHabits = ["Introvert", "Extrovert", "Ambivert"];
const sleepingHabits = ["Early Bird", "Night Owl", "Flexible"];
const datingPace = ["Slow and steady", "Fast and passionate", "Somewhere in between"];
const securityOptions = ["Two-Factor Authentication", "Security Questions", "Backup Email"];
const fitnessLifestyle = ["Active", "Occasionally active", "Not active"];
const workFlexibility = ["Frequent traveler", "Remote worker", "Fixed location"];
const verificationMethods = ["ID Verification"];
const ProgressiveForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
     name: "",
    username: "",
    email: "",
    phone: "",
    gender: "",
    dateOfBirth: "",
    location: "",
    profilePicture: "",
    bio: "",
    relationshipStatus: "",
    lookingFor: "",
    preferredAgeRange: [18, 50],
    genderPreference: "",
    preferredLocationRadius: 50,
    communicationStyle: "",
    loveLanguage: "",
    socialHabit: "",
    sleepingHabit: "",
    datingPace: "",
    fitnessLifestyle: "",
    workFlexibility: "",
    isVerified: false,
    verificationStatus: "unverified",
    verificationMethod: "",
    securityOption: "",
    idFront: "",
    idBack: "",
    children: "",
    interests: [],
    hobbies: [],
    languagesSpoken: "",
    religion: "",
    dietaryPreferences: "",
    smoking: "",
    drinking: "",
    occupation: "",
    educationLevel: "",
    incomeRange: "",
    workSchedule: "",
    zodiacSign: "",
    //
    height: "",
    weight: "",
    bodyType: "",
    hairColor: "",
    eyeColor: "",
    facialHair: "",
    tattoos: false,
    piercings: false,
    petOwnership: "",
    petType: ""
  });

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleCheckboxChange = (e, field) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [field]: checked ? [...prev[field], value] : prev[field].filter((item) => item !== value),
    }));
  };


  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <>
            <TextField name="name" label="Name" value={formData.name} onChange={handleChange} fullWidth margin="normal" />
            <TextField name="username" label="Username" value={formData.username} onChange={handleChange} fullWidth margin="normal" />
            <TextField name="email" label="Email" value={formData.email} onChange={handleChange} fullWidth margin="normal" />
            <TextField name="phone" label="Phone" value={formData.phone} onChange={handleChange} fullWidth margin="normal" />
            <TextField name="gender" label="Gender" select value={formData.gender} onChange={handleChange} fullWidth margin="normal">
              {["Male", "Female", "Non-binary", "Other"].map((option) => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
              ))}
            </TextField>
            <TextField name="dateOfBirth" label="Date of Birth" type="date" value={formData.dateOfBirth} onChange={handleChange} fullWidth margin="normal" InputLabelProps={{ shrink: true }} />
            <TextField name="location" label="Location" value={formData.location} onChange={handleChange} fullWidth margin="normal" />
            <TextField name="zodiacSign" label="Zodiac Sign" select value={formData.zodiacSign} onChange={handleChange} fullWidth margin="normal">
              {zodiacSigns.map((option) => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
              ))}
            </TextField>
            <Grid item>
          <TextField
            label="Bio"
            name="bio"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={formData.bio}
            onChange={handleChange}
            placeholder="Write a short bio..."
            inputProps={{ maxLength: 300 }}
          />
        </Grid>
          </>
        );
      case 1:
        return (
          <>
            <TextField name="relationshipStatus" label="Relationship Status" select value={formData.relationshipStatus} onChange={handleChange} fullWidth margin="normal">
              {["Single", "Divorced", "Widowed"].map((option) => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
              ))}
            </TextField>
            <TextField name="lookingFor" label="Looking For" select value={formData.lookingFor} onChange={handleChange} fullWidth margin="normal">
              {["Serious Relationship", "Friendship", "Casual Dating"].map((option) => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
              ))}
            </TextField>
            <TextField name="communicationStyle" label="Communication Style" select value={formData.communicationStyle} onChange={handleChange} fullWidth margin="normal">
              {communicationStyles.map((option) => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
              ))}
            </TextField>
            <TextField name="loveLanguage" label="Love Language" select value={formData.loveLanguage} onChange={handleChange} fullWidth margin="normal">
              {loveLanguages.map((option) => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
              ))}
            </TextField>
            <TextField name="height" label="Height" value={formData.height} onChange={handleChange} fullWidth margin="normal" />
            <TextField name="weight" label="Weight" value={formData.weight} onChange={handleChange} fullWidth margin="normal" />
            <TextField name="bodyType" label="Body Type" select value={formData.bodyType} onChange={handleChange} fullWidth margin="normal">
              {["Slim", "Average", "Athletic", "Curvy", "Full-figured"].map((option) => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
              ))}
            </TextField>
            <TextField name="hairColor" label="Hair Color" value={formData.hairColor} onChange={handleChange} fullWidth margin="normal" />
            <TextField name="eyeColor" label="Eye Color" value={formData.eyeColor} onChange={handleChange} fullWidth margin="normal" />
            <TextField name="facialHair" label="Facial Hair" select value={formData.facialHair} onChange={handleChange} fullWidth margin="normal">
              {["No facial hair", "Beard", "Mustache", "Goatee"].map((option) => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
              ))}
            </TextField>
            <FormControlLabel
              control={<Checkbox checked={formData.tattoos} onChange={(e) => handleChange(e, "tattoos")} />}
              label="Has Tattoos"
            />
            <FormControlLabel
              control={<Checkbox checked={formData.piercings} onChange={(e) => handleChange(e, "piercings")} />}
              label="Has Piercings"
            />
            <TextField name="petOwnership" label="Pet Ownership" select value={formData.petOwnership} onChange={handleChange} fullWidth margin="normal">
              {["Owns Pets", "Wants Pets", "No Pets"].map((option) => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
              ))}
            </TextField>
            <TextField name="petType" label="Pet Type" select value={formData.petType} onChange={handleChange} fullWidth margin="normal">
              {["Dog", "Cat", "Other"].map((option) => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
              ))}
            </TextField>

          </>
        );
      case 2:
        return (
               <>
            <TextField name="verificationMethod" label="Verification Method" select value={formData.verificationMethod} onChange={handleChange} fullWidth margin="normal">
              {verificationMethods.map((option) => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
              ))}
            </TextField>
            <TextField type="file" name="idFront" label="Upload Front of ID" onChange={handleChange} fullWidth margin="normal" />
            <TextField type="file" name="idBack" label="Upload Back of ID" onChange={handleChange} fullWidth margin="normal" />
 
            <TextField name="securityOption" label="Security Option" select value={formData.securityOption} onChange={handleChange} fullWidth margin="normal">
              {securityOptions.map((option) => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
              ))}
            </TextField>
          </>
        );
      case 3:
        return (
          <>
            <TextField name="children" label="Children" select value={formData.children} onChange={handleChange} fullWidth margin="normal">
              {["No children", "Has children", "Open to children"].map((option) => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
              ))}
            </TextField>
            <TextField name="hobbies" label="Hobbies" value={formData.hobbies} onChange={handleChange} fullWidth margin="normal" />
            <TextField name="languagesSpoken" label="Languages Spoken" value={formData.languagesSpoken} onChange={handleChange} fullWidth margin="normal" />
            <TextField name="occupation" label="Occupation" value={formData.occupation} onChange={handleChange} fullWidth margin="normal" />
            <TextField name="educationLevel" label="Education Level" select value={formData.educationLevel} onChange={handleChange} fullWidth margin="normal">
              {["High School", "Bachelor’s", "Master’s", "PhD"].map((option) => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
              ))}
            </TextField>
            <TextField name="dietaryPreferences" label="Dietary Preferences" select value={formData.dietaryPreferences} onChange={handleChange} fullWidth margin="normal">
              {dietOptions.map((option) => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
              ))}
            </TextField>
            <TextField name="smoking" label="Smoking Habit" select value={formData.smoking} onChange={handleChange} fullWidth margin="normal">
              {smokingOptions.map((option) => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
              ))}
            </TextField>
            <TextField name="drinking" label="Drinking Habit" select value={formData.drinking} onChange={handleChange} fullWidth margin="normal">
              {drinkingOptions.map((option) => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
              ))}
            </TextField>
            <TextField name="workSchedule" label="Work Schedule" select value={formData.workSchedule} onChange={handleChange} fullWidth margin="normal">
              {workScheduleOptions.map((option) => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
              ))}
            </TextField>
            <TextField name="religion" label="Religion" select value={formData.religion} onChange={handleChange} fullWidth margin="normal">
              {religionOptions.map((option) => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
              ))}
            </TextField>
            <TextField name="dietaryPreferences" label="Dietary Preferences" select value={formData.dietaryPreferences} onChange={handleChange} fullWidth margin="normal">
              {dietOptions.map((option) => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
              ))}
            </TextField>
     
            <TextField name="socialHabit" label="Social Habit" select value={formData.socialHabit} onChange={handleChange} fullWidth margin="normal">
              {socialHabits.map((option) => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
              ))}
            </TextField>
            <TextField name="sleepingHabit" label="Sleeping Habit" select value={formData.sleepingHabit} onChange={handleChange} fullWidth margin="normal">
              {sleepingHabits.map((option) => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
              ))}
            </TextField>
            <TextField name="datingPace" label="Dating Pace" select value={formData.datingPace} onChange={handleChange} fullWidth margin="normal">
              {datingPace.map((option) => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
              ))}
            </TextField>
            <TextField name="fitnessLifestyle" label="Fitness Lifestyle" select value={formData.fitnessLifestyle} onChange={handleChange} fullWidth margin="normal">
              {fitnessLifestyle.map((option) => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
              ))}
            </TextField>
            <TextField name="workFlexibility" label="Work Flexibility" select value={formData.workFlexibility} onChange={handleChange} fullWidth margin="normal">
              {workFlexibility.map((option) => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
              ))}
            </TextField>
          </>
        );
        case 4:
          return (
            <>
             <Box>
              <p>Hobbies:</p>
              {hobbiesOptions.map((hobby) => (
                <FormControlLabel
                  key={hobby}
                  control={<Checkbox value={hobby} onChange={(e) => handleChange(e, "hobbies")} />}
                  label={hobby}
                />
              ))}
            </Box>

          <Box>
            <p>Interests:</p>
            {interestsOptions.map((interest) => (
              <FormControlLabel
                key={interest}
                control={<Checkbox value={interest} onChange={(e) => handleCheckboxChange(e, "interests")} />}
                label={interest}
              />
            ))}
          </Box>

            <TextField name="languagesSpoken" label="Languages Spoken" select value={formData.languagesSpoken} onChange={handleChange} fullWidth margin="normal" multiple>
              {languagesOptions.map((option) => (<MenuItem key={option} value={option}>{option}</MenuItem>))}
            </TextField>
          </>
          )
      default:
        return null;
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto" }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <form>{renderStepContent(activeStep)}</form>

      <div style={{ marginTop: 20, display: "flex", justifyContent: "space-between" }}>
        <Button disabled={activeStep === 0} onClick={handleBack}>Back</Button>
        {activeStep === steps.length - 1 ? (
          <Button variant="contained" color="primary">Submit</Button>
        ) : (
          <Button variant="contained" color="primary" onClick={handleNext}>Next</Button>
        )}
      </div>
    </div>
  );
};

export default ProgressiveForm;
