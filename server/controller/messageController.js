const mongoose = require("mongoose");
const { Conversation } = require("../models/conversationModel.js");
const { Message } = require("../models/messageModel.js");
const { getReceiverSocketId } = require("../socket/socket.js");

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

const sendMessage = async (req, res) => {
  try {
    const senderId = req.id;
    const receiverId = req.params.id;
    const { message } = req.body;

    if (!isValidObjectId(senderId) || !isValidObjectId(receiverId)) {
      return res.status(400).json({ error: "Invalid sender or receiver ID" });
    }

    let gotConversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!gotConversation) {
      gotConversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      gotConversation.messages.push(newMessage._id);
    }
    await Promise.all([gotConversation.save(), newMessage.save()]);

    // SOCKET IO
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    return res.status(201).json({ newMessage });
  } catch (error) {
    console.log("Error in sendMessage:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getMessage = async (req, res) => {
  try {
    const receiverId = req.params.id;
    const senderId = req.id;

    if (!isValidObjectId(senderId) || !isValidObjectId(receiverId)) {
      return res.status(400).json({ error: "Invalid sender or receiver ID" });
    }

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    }).populate("messages");

    return res.status(200).json(conversation?.messages || []);
  } catch (error) {
    console.log("Error in getMessage:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { sendMessage, getMessage };
