const express = require("express");
const router = express.Router();

const {
  createConversation,
  sendMessage,
  getMessages
} = require("../controllers/chatController");

const protect = require("../middleware/authMiddleware");

// create/open chat
router.post("/conversation", protect, createConversation);

// send message
router.post("/message", protect, sendMessage);

// get messages
router.get("/messages/:conversationId", protect, getMessages);

module.exports = router;