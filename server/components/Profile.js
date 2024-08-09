const multer = require('multer');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const UserProfile = require('../models/Profile');
const fs = require('fs');
const router = express.Router();
const { ObjectId } = require('mongoose').Types;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = 'uploads/';
      if (!fs.existsSync(uploadPath)){
        fs.mkdirSync(uploadPath);
      }
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  });
  
  const upload = multer({ storage });
 

  router.post('/create', upload.single('image'),async (req, res) => {
    try {
      const { user, name, designation, department, phone, skills, pendingSkills } = req.body;
      const parsedSkills = JSON.parse(skills || '[]');
      const parsedPendingSkills = JSON.parse(pendingSkills || '[]');
      let imageUrl = '';
  
      if (req.file) {
        imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
      }
  
      const newProfile = new UserProfile({
        user,
        name,
        designation,
        department,
        phone,
        imageUrl,
        skills: parsedSkills,
        pendingSkills: parsedPendingSkills
      });
  
      const savedProfile = await newProfile.save();
      res.status(201).json({
        success: true,
        message: 'Profile created successfully',
        data: savedProfile
      });
    } catch (error) {
      console.error('Error creating profile:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });

  router.get('/getProfile/:userId', async (req, res) => {
    try {
      const userId = req.params.userId;
      // console.log(userId);
      if (!ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid User ID format' });
      }
  
      const profile = await UserProfile.findOne({ user: userId }).populate('user', 'email role');

      if (!profile) {
        return res.status(404).json({ message: 'Profile not found' });
      }
  
      res.json(profile);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  });

  router.get('/getAll', async (req, res) => {
    try {
     
      const profiles = await UserProfile.find().populate('user', 'email role');
  
      if (!profiles || profiles.length === 0) {
        return res.status(404).json({ message: 'No profiles found' });
      }
  
      res.json(profiles);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  });


 
router.put('/updatePendingSkills/:userId', async (req, res) => {
  const { userId } = req.params;
  const { pendingSkills } = req.body;

  try {
    // Find the profile and update pendingSkills
    const updatedProfile = await Profile.findOneAndUpdate(
      { user: userId }, // Assuming 'user' field in Profile schema is used to match
      { $set: { pendingSkills: pendingSkills } },
      { new: true } // Returns the updated document
    );

    if (!updatedProfile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.json(updatedProfile);
  } catch (error) {
    console.error('Error updating pending skills:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

  

  module.exports = router;