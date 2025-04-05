const mongoose = require("mongoose");
const FlatModel = require("../models/FlatModel");
const MessageSchema = require("../models/MessageModel");
const MessageModel = mongoose.model("Message", MessageSchema);

const addMessages = async (req, res) => {
  const { flatid } = req.params;
  console.log("flatid:", flatid);
  const { messageText } = req.body;
  const senderId = req.user.id;
  const senderFirstName = req.user.fullName;

  try {
    if (!mongoose.Types.ObjectId.isValid(flatid)) {
      return res.status(400).json({ message: "Invalid flat ID format" });
    }

    const flat = await FlatModel.findById(flatid);

    console.log(flat);

    if (!flat) {
      return res.status(404).json({ message: "No flat found" });
    }

    if (flat.userId.toString() === senderId.toString()) {
      return res
        .status(403)
        .json({ message: "You cannot message your own flat." });
    }

    const newMessage = new MessageModel({
      senderId,
      firstName: senderFirstName,
      messageText,
      timestamp: new Date(),
    });

    flat.messages.push(newMessage);
    await flat.save();

    res.status(201).json({ message: "Message added Sucesfully", newMessage });
  } catch (error) {
    console.log("Error adding message", error);
    res.status(500).json({ message: error.message });
  }
};

const getAllMesagges = async (req, res) => {
  const { flatid } = req.params;
  const userId = req.user.id;

  try {
    if (!mongoose.Types.ObjectId.isValid(flatid)) {
      return res.status(400).json({ message: "Invalid flat ID format" });
    }

    const flat = await FlatModel.findById(flatid);

    console.log("Flat", flat);

    if (!flat) {
      return res.status(404).json({ message: "No flat found" });
    }

    if (flat.userId.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "You are not the owner of this flat!" });
    }

    await flat.populate("messages");

    res.status(201).json(flat.messages);
  } catch (error) {
    console.log("Error getting all messages", error);
    res.status(500).json({ message: error.message });
  }
};

const getUserMessages = async (req, res) => {
  const { flatid, senderId } = req.params;
  const userId = req.user.id;

  try {
    if (
      !mongoose.Types.ObjectId.isValid(flatid) ||
      !mongoose.Types.ObjectId.isValid(senderId)
    ) {
      return res.status(400).json({ message: "Invalid flat ID format" });
    }

    const flat = await FlatModel.findById(flatid);

    console.log("Flat", flat);

    if (!flat) {
      return res.status(404).json({ message: "No flat found" });
    }

    if (flat.userId.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "You are not the owner of this flat!" });
    }

    const userMessages = flat.messages.filter(
      (message) => message.senderId.toString() === senderId.toString()
    );

    if (userMessages.length === 0) {
      return res
        .status(404)
        .json({ message: "No message found from this user" });
    }

    res.status(201).json(userMessages);
  } catch (error) {
    console.log("Get user message error", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addMessages, getAllMesagges, getUserMessages };
