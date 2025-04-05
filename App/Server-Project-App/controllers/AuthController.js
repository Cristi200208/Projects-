const UserModel = require("../models/UserModel");
const {
  comparePasswords,
  signToken,
} = require("../services/encryption-service");

const registerUser = async (req, res) => {
  const userData = req.body;
  try {
    console.log(userData._id);
    const newUser = new UserModel(userData);
    await newUser.save();
    console.log(newUser);
    res.status(201).json({
      message: "User registered sucesfully",
      data: newUser._id,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    if (!email || !password) throw Error("Email and password are required");
    const userEntry = await UserModel.findOne({ email: email });
    if (!userEntry) throw Error("User dosen`t exist");

    const hassedPassword = userEntry.password;
    const passwordValid = await comparePasswords(password, hassedPassword);

    if (!passwordValid) throw Error("Password do not match!");

    console.log(userEntry);
    const token = signToken(userEntry);
    res.status(200).json(token);
    console.log(token);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
