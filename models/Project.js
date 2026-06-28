const mongoose = require('mongoose');
//test
const ProjectSchema = new mongoose.Schema({
    id: Number,
  title: String,
  category: String,
  location: String,
  imageUrl: String,
  description: String,
  materials: [String],
  portfolio: [String],
});

module.exports = mongoose.models.Project || mongoose.model('Project', ProjectSchema);