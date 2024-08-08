const mongoose = require("mongoose");

const UserProfileSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true,ref: 'User' },
  name:{ type: String, required: true },
  designation: { type: String, required: true },
  department: { type: String, required: true },
  phone:{ type: String, required: true },
  imageUrl: { type: String }
});

module.exports = mongoose.model("Profile", UserProfileSchema);
