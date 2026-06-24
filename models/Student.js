const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  student_id: { type: String, required: true, unique: true, trim: true },
  name: { type: String, required: true, trim: true },
  grade: { type: String, required: true, trim: true },
  age: { type: Number },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Student || mongoose.model('Student', studentSchema);