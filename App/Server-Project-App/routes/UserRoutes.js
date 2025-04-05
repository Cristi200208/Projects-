const express = require("express");
const UserConttroler = require("../controllers/UserController");
const authMiddleware = require("../middlewares/AuthMiddleware");
const router = express.Router();

router.get("/", authMiddleware.verifyAdmin, UserConttroler.getAllUsers);
router.get("/user", UserConttroler.getUser);
router.get("/:userID", UserConttroler.getUserById);
router.post("/:id", authMiddleware.isAdminOrOwner, UserConttroler.updateUser);
router.delete("/:id", authMiddleware.isAdminOrOwner, UserConttroler.deleteUser);

module.exports = router;
