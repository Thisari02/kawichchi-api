const User = require('../models/User');

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().lean();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { name, email, age } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    const user = await User.create({ name, email, age });
    res.status(201).json(user);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ error: 'Email already exists' });
    }
    res.status(500).json({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {  
  try {
    const { id } = req.params;
    const { name, email, age } = req.body;

    if (!name && !email && age === undefined) {
      return res.status(400).json({ error: 'At least one field is required to update' });
    }

    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (age !== undefined) updateData.age = age;

    if (email) {
      const existingUser = await User.findOne({ email }).lean();
      if (existingUser && existingUser._id.toString() !== id) {
        return res.status(409).json({ error: 'Email already exists' });
      }
    }

    const user = await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
      context: 'query'
    }).lean();

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ error: 'Email already exists' });
    }
    res.status(500).json({ error: error.message });
  }
};