const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    firstName: { type: String, required: true },
    messageText: { type: String, required: true },
    timeStamp: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
    _id: false,
  }
);

module.exports = MessageSchema;
