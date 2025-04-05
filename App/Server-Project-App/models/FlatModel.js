const mongoose = require("mongoose");
const MessageSchema = require("./MessageModel"); //

const FlatSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    city: { type: String, required: true },
    streetName: { type: String, required: true },
    streetNumber: { type: String, required: true },
    areaSize: { type: Number, required: true },
    hasAc: { type: Boolean, required: true },
    yearBuilt: { type: Number, required: true },
    rentPrice: { type: Number, required: true },
    dataAvailable: { type: Date, required: true },
    messages: { type: [MessageSchema], required: false },
    description: { type: String, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

const FlatModel = mongoose.model("Flat", FlatSchema);

module.exports = FlatModel;
