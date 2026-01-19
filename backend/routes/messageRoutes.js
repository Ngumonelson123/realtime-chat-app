const express = require("express");
const protect = require("../middleware/authMiddleware");
const { getMessagesByRoom } = require("../controllers/messageController");

const router = express.Router();

router.get("/:roomId", protect, getMessagesByRoom);

module.exports = router;