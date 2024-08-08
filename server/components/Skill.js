const express = require('express');
const Skill = require('../models/Skill');
const multer = require('multer');
const path = require('path');
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

router.post('/create', upload.single('skillImage'), async (req, res) => {
  try {
    const { skillName, techStack } = req.body;
    const parsedTechStack = JSON.parse(techStack); // Assuming techStack is a JSON string
    
    // Process image file
    const skillImage = req.file ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}` : '';

    // Create a new skill document
    const skill = new Skill({
      skillName,
      skillImage,
      techStack: parsedTechStack
    });

    // Save the skill to the database
    await skill.save();
    res.status(201).send(skill);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});
router.get('/getSkills', async (req, res) => {
  try {
    const skills = await Skill.find();
    res.status(200).send(skills);
  } catch (error) {
    console.error('Error fetching skills:', error);
    res.status(500).send({ error: 'Server error' });
  }
});

router.delete('/deleteSkill/:id', async (req, res) => {
  
  try {
    const {id} = req.params;
    await Skill.findByIdAndDelete(id);
    res.status(200).send({ message: 'deleted successfully' });
  } catch (error) {
    console.error('Error fetching skills:', error);
    res.status(500).send({ error: 'Server error' });
  }
  
});


module.exports = router;
