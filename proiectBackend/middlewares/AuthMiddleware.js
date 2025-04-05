const jwt = require("jsonwebtoken");
const FlatModel = require("../models/FlatModel");
const mongoose = require("mongoose");

const verifyAuthentication = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) throw Error("No token provided");

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const currentTime = Math.floor(Date.now() / 1000);

    if (decoded.exp < currentTime) {
      return res.status(401).json({ message: "Token has expried" });
    }

    console.log("Decoded", decoded);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

const verifyAdmin = (req, res, next) => {
  const userRole = req.user.isAdmin;
  if (!userRole) {
    return res.status(401).json({ message: "You are not Admin" });
  }
  console.log("User its Admin");
  next();
};

const isAdminOrOwner = (req, res, next) => {
  const userIDToUpdate = req.params.userID;
  const requestUserID = req.user.userID;
  const userRole = req.user.isAdmin;

  if (userRole || userIDToUpdate === requestUserID) {
    return next();
  } else {
    return res.status(403).json({ message: "Permision Denied" });
  }
};

const isAdminOrOwnerFlat = async (req, res, next) => {
  const { flatid } = req.params;
  const requestUserID = req.user.id;
  const userRole = req.user.isAdmin;
  try {
    const flat = await FlatModel.findById(flatid);

    console.log("Flat", flat);

    if (!flat) {
      return res.status(404).json({ message: "No flat found" });
    }

    if (userRole || flat.userId.toString() === requestUserID) {
      return next();
    } else {
      return res.status(403).json({ message: "Permision Denied" });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Errror checking flat ownership",
      error: error.message,
    });
  }
};

module.exports = {
  verifyAuthentication,
  verifyAdmin,
  isAdminOrOwner,
  isAdminOrOwnerFlat,
};
