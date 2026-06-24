const Student = require('../models/Student');

exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find().lean();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createStudent = async (req, res) => {
  try {
    const { student_id, name, grade, age } = req.body;

    if (!student_id || !name || !grade) {
      return res.status(400).json({ error: 'student_id, name, and grade are required' });
    }

    const student = new Student({ student_id, name, grade, age });
    await student.save();
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { student_id, name, grade, age } = req.body;

    const student = await Student.findByIdAndUpdate(
      id,
      { student_id, name, grade, age },
      { new: true, runValidators: true }
    );

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await Student.findByIdAndDelete(id);

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
