const multer = require('multer');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const UserProfile = require('../models/Profile');
const fs = require('fs');
const router = express.Router();

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

  module.exports = router;