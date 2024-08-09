const mongoose = require("mongoose");

const UserProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name:{ type: String},
  designation: { type: String },
  department: { type: String },
  phone:{ type: String},
  imageUrl: { type: String },
  skills: [{
    skillName: { type: String },
    level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'] }
  }],
  pendingSkills: [{
    skillName: { type: String },
    level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced']}
  }]

});

module.exports = mongoose.model("Profile", UserProfileSchema);
