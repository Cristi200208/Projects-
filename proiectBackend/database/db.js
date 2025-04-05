const mongoose = require("mongoose");
const MONGO_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority&appName=FlatFinder-Cluster`;
const conectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB Caonnected sucesfuly");
  } catch (error) {
    console.log("MongoDB Conection failed");
    console.log("Mongo error", error.message);
  }
};

module.exports = conectDB;
