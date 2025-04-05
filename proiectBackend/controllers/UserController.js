const { default: mongoose } = require("mongoose");
const UserModel = require("../models/UserModel");
const FlatModel = require("../models/FlatModel");

const getUser = async (req, res) => {
  try {
    const id = req.user.id;
    const user = await UserModel.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not Found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user by ID");
    res.status(500).json({ message: "Server error" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    console.log("Error getting all Users", error);
    res.status(400).json({ message: error.message });
  }
};

const getUserById = async (req, res, next) => {
  try {
    const userID = req.params.userID;
    const user = await UserModel.findById(userID).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not Found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user by ID");
    res.status(500).json({ message: "Server error" });
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  const { id } = req.params;
  const updatedData = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid user ID Format" });
  }

  try {
    const user = await UserModel.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).json({ message: "User not Found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user by ID");
    res.status(500).json({ message: "Server error" });
    next(error);
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid user ID Format" });
  }

  try {
    const deletedFlats = await FlatModel.deleteMany({ userId: id });

    const user = await UserModel.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: "User not Found" });
    }

    res.status(200).json({
      message: "User delleted succesfuly",
      flatsDeleted: deletedFlats.deletedCount,
    });
  } catch (error) {
    console.error("Error fetching user by ID");
    res.status(500).json({ message: "Server error" });
    next(error);
  }
};

module.exports = {
  getUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
