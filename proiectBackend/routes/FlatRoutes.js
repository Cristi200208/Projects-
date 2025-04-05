const express = require("express");
const authMiddleware = require("../middlewares/AuthMiddleware");
const FlatConttroler = require("../controllers/FlatConttroler");
const messageConttroler = require("../controllers/MessagesConttroler");
const router = express.Router();

router.post("/add", FlatConttroler.addFlat);
router.post(
  "/:flatid",
  authMiddleware.isAdminOrOwnerFlat,
  FlatConttroler.updateFlat
);
router.delete(
  "/:flatid",
  authMiddleware.isAdminOrOwnerFlat,
  FlatConttroler.deleteFlat
);
router.get("/:flatid", FlatConttroler.getFlatById);
router.get("/", FlatConttroler.getAllFlats);

router.post("/:flatid/messages", messageConttroler.addMessages);

router.get("/:flatid/messages", messageConttroler.getAllMesagges);

router.get("/:flatid/messages/:senderId", messageConttroler.getUserMessages);

router.post("/favorites/:flatid", FlatConttroler.addFlatToFavorites);

module.exports = router;
