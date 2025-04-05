const mongoose = require("mongoose");
const { hashPassword } = require("../services/encryption-service");

const favoriteFlatSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, ref: "Flat" },
  quantity: { type: Number, default: 1 },
});

const UserSchema = new mongoose.Schema(
  {
    email: {
      id: { type: String },
      type: String,
      required: [true, "Please provide an eamil"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please probide a password"],
      minlength: [6, "Password must be at least 6 caracters long "],
    },
    firstName: {
      type: String,
      required: [true, "Please probvide a First Name"],
    },
    lastName: {
      type: String,
      required: [true, "Please probvide a Last Name"],
    },
    birthDate: {
      type: String,
      required: [true, "Please probvide a Birth Date"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    faovriteFlatList: {
      type: [favoriteFlatSchema],
      ref: "Flat",
      default: [],
    },
    created: {
      type: Date,
      default: Date.now,
    },
    updated: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  }
);

UserSchema.pre("save", async function (next) {
  console.log("Pre save hock");
  const user = this;
  if (!user.isModified("password")) next();

  try {
    const hashedPassword = await hashPassword(user.password);
    console.log("Hassed Password");
    console.log(hashedPassword);
    user.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
