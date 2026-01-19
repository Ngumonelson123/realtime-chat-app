const express = require("express");
const protect = require("../middleware/authMiddleware");
const { createRoom, getRooms, joinRoom, leaveRoom } = require("../controllers/roomController");

const router = express.Router();

router.get("/", protect, getRooms);
router.post("/", protect, createRoom);
router.post("/:roomId/join", protect, joinRoom);
router.post("/:roomId/leave", protect, leaveRoom);

module.exports = router;
