const Conversation = require("../models/Conversation");
const Message = require("../models/Message");

// CREATE OR GET CONVERSATION
exports.createConversation = async (req, res) => {
  try {
    const { userId } = req.body; // other user

    const myId = req.user.id;

    // check if conversation already exists
    let conversation = await Conversation.findOne({
      participants: { $all: [myId, userId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [myId, userId],
      });
    }

    res.json(conversation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



//  send msg api
exports.sendMessage = async (req, res) => {
  try {
    const { conversationId, text } = req.body;

    const message = await Message.create({
      conversationId,
      sender: req.user.id,
      text,
    });

    // update last message in conversation
    await Conversation.findByIdAndUpdate(conversationId, {
      lastMessage: text,
    });

    res.json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get msg/histoty

exports.getMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;

    const messages = await Message.find({ conversationId })
      .populate("sender", "username email")
      .sort({ createdAt: 1 });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};