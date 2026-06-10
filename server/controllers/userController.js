const User = require("../models/User");

// GET ALL USERS (except logged-in user)
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({
      _id: { $ne: req.user.id }
    }).select("-password");

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};