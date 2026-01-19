const express = require("express");
const cors = require("cors");
require("dotenv").config();
const http = require("http");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const roomRoutes = require("./routes/roomRoutes");
const messageRoutes = require("./routes/messageRoutes");

const Message = require("./models/Message");

const app = express();
const server = http.createServer(app);

// ✅ Socket.IO
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => res.send("✅ Chat API Running..."));
app.use("/api/auth", authRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/messages", messageRoutes);

// ✅ Socket logic
io.on("connection", (socket) => {
  console.log("✅ A user connected:", socket.id);

  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
    console.log(`✅ User ${socket.id} joined room ${roomId}`);
  });

  socket.on("sendMessage", async ({ roomId, senderId, text }) => {
    try {
      // Save message in DB
      const message = await Message.create({
        room: roomId,
        sender: senderId,
        text,
      });

      // Broadcast message to room
      io.to(roomId).emit("receiveMessage", {
        _id: message._id,
        room: roomId,
        sender: { _id: senderId },
        text: message.text,
        createdAt: message.createdAt,
      });
    } catch (error) {
      console.log("❌ sendMessage error:", error.message);
    }
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

// Start server + DB
const PORT = process.env.PORT || 5000;

connectDB();
server.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
