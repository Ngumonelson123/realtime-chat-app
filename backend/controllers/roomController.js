const Room = require("../models/Room");

const createRoom = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) return res.status(400).json({ message: "Room name is required" });

    const existing = await Room.findOne({ name });
    if (existing) return res.status(400).json({ message: "Room already exists" });

    const room = await Room.create({ name, members: [req.user.id] });
    return res.status(201).json(room);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find().sort({ createdAt: -1 });
    return res.json(rooms);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const joinRoom = async (req, res) => {
  try {
    const { roomId } = req.params;

    const room = await Room.findById(roomId);
    if (!room) return res.status(404).json({ message: "Room not found" });

    const alreadyMember = room.members.includes(req.user.id);
    if (!alreadyMember) {
      room.members.push(req.user.id);
      await room.save();
    }

    return res.json({ message: "Joined room successfully", room });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const leaveRoom = async (req, res) => {
  try {
    const { roomId } = req.params;

    const room = await Room.findById(roomId);
    if (!room) return res.status(404).json({ message: "Room not found" });

    room.members = room.members.filter((id) => id.toString() !== req.user.id);
    await room.save();

    return res.json({ message: "Left room successfully", room });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { createRoom, getRooms, joinRoom, leaveRoom };
