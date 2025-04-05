const FlatModel = require("../models/FlatModel");
const mongoose = require("mongoose");
const UserModel = require("../models/UserModel");

const addFlat = async (req, res) => {
  const flatData = req.body;
  const userId = req.user.id;

  try {
    console.log("Flat data", flatData);
    console.log("User ID ", userId);

    const newFlat = new FlatModel({
      ...flatData,
      userId: userId,
    });

    await newFlat.save();

    console.log("Saved flat", newFlat);

    res
      .status(201)
      .json({ message: "Flatt added sucefuly!", flatAdded: newFlat });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error ADDING flat", error: error.message });
  }
};

const updateFlat = async (req, res) => {
  const { flatid } = req.params;
  const updatedData = req.body;

  try {
    const flatToUpdate = await FlatModel.findById(flatid);

    if (!flatToUpdate) {
      return res.status(404).json({ message: "No Flat Found" });
    }

    Object.assign(flatToUpdate, updatedData);

    const savedFlat = await flatToUpdate.save();

    res
      .status(201)
      .json({ message: "Flat updated sucesfuly ", flat: savedFlat });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error Updating Flat", error: error.message });
  }
};

const deleteFlat = async (req, res, next) => {
  const { flatid } = req.params;

  if (!mongoose.Types.ObjectId.isValid(flatid)) {
    return res.status(400).json({ message: "Invalid user ID Format" });
  }

  try {
    const flat = await FlatModel.findByIdAndDelete(flatid);

    if (!flat) {
      return res.status(404).json({ message: "Flat not Found" });
    }

    res.status(200).json({ message: "Flat deleted succesfuly" });
  } catch (error) {
    console.error("Error fetching flat by ID");
    res.status(500).json({ message: "Server error" });
    next(error);
  }
};

const getFlatById = async (req, res) => {
  const { flatid } = req.params;

  if (!mongoose.Types.ObjectId.isValid(flatid)) {
    return res.status(400).json({ message: "Invalid user ID Format" });
  }

  try {
    const flat = await FlatModel.findById(flatid);

    if (!flat) {
      return res.status(404).json({ message: "Flat not found" });
    }

    res.status(201).json({ message: "Flat Founded ", flat: flat });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error fetching flat by Id", error: error.message });
  }
};

const getAllFlats = async (req, res) => {
  try {
    const flats = await FlatModel.find();

    if (!flats || flats.length === 0) {
      return res.status(404).json({ message: "No Flats Found! " });
    }

    res.status(200).json({ flats });
  } catch (error) {
    console.log("Error fetching flats:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const addFlatToFavorites = async (req, res) => {
  const { flatid } = req.params;
  const id = req.user.id;

  console.log("It Works");

  if (!mongoose.Types.ObjectId.isValid(flatid)) {
    return res.status(400).json({ message: "Invalid flat ID " });
  }
  try {
    const user = await UserModel.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const flat = await FlatModel.findById(flatid);
    console.log(flat, "flat");

    if (!flat) {
      return res.status(404).json({ message: "Flat not found" });
    }

    const isFavorite = user.faovriteFlatList.includes(flatid);

    if (isFavorite) {
      return res.status(400).json({ message: "Flat aready in favoirtes" });
    }

    user.faovriteFlatList.push(flatid);

    await user.save();

    return res.status(200).json({
      message: "Flat added to favorites successfuly",
      faovriteFlatList: user.faovriteFlatList,
    });
  } catch (error) {
    console.error("Error adding flat to favorites:", error.message);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  updateFlat,
  addFlat,
  deleteFlat,
  getFlatById,
  getAllFlats,
  addFlatToFavorites,
};
