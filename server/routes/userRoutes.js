const express = require("express");
const router = express.Router();

const { getUsers } = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");

// get all users
router.get("/", protect, getUsers);

module.exports = router;