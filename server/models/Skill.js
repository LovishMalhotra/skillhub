const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
    skillName: { type: String, required: true },
    skillImage: { type: String }, 
    techStack: [{
      techName: { type: String},
      techImage: { type: String} 
    }]
  });

module.exports = mongoose.model('Skill', skillSchema);