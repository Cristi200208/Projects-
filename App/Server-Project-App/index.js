const dotenv = require("dotenv");

dotenv.config();
const express = require("express");
const cors = require("cors");
const conectDB = require("./database/db");
const authMiddleware = require("./middlewares/AuthMiddleware");
const authRoutes = require("./routes/AuthRoutes");
const userRoutes = require("./routes/UserRoutes");
const flatRoutes = require("./routes/FlatRoutes");

const PORT = process.env.PORT || 3030;
const ENVIRIONEMENT = process.env.NODE_ENV || "DEV";
const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

// Routes
// Unprotected Routes
app.use("/auth", authRoutes);

// Protected Routes
app.use(authMiddleware.verifyAuthentication);
app.use("/flats", flatRoutes);
app.use("/users", userRoutes);

const startServer = async () => {
  console.log(">==================================<");
  console.log(`--FLAT FINDER APP ${ENVIRIONEMENT} MODE--`);
  console.log(">==================================<");
  console.log(`-CONFIGURATION-`);
  console.log(`-PORT , ${PORT}-`);
  console.log(`-ENVIRIONEMENT , ${ENVIRIONEMENT}-`);
  console.log(`-MONGO-USER: ${process.env.MONGO_USER}-`);
  try {
    await conectDB();

    app.listen(PORT, () => {
      console.log(`--SERVER IS RUNING ON PORT ${PORT}--`);
    });
  } catch (error) {
    console.log("Error message", error);
  }
};

app.get("/test", (req, res) => {
  res.send("Hello World!!!!");
});

startServer();
