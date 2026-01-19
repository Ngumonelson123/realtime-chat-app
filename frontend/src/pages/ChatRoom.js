import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api, setAuthToken, API_BASE } from "../services/api";
import { io } from "socket.io-client";

const socket = io(API_BASE);

export default function ChatRoom() {
  const { roomId } = useParams();
  const navigate = useNavigate();

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");
    setAuthToken(token);

    // Join socket room
    socket.emit("joinRoom", roomId);

    loadMessages();

    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => socket.off("receiveMessage");
  }, [roomId]);

  const loadMessages = async () => {
    try {
      const res = await api.get(`/api/messages/${roomId}`);
      setMessages(res.data);
    } catch (err) {
      console.log("❌ loadMessages error");
    }
  };

  const sendMessage = () => {
    if (!text.trim()) return;

    socket.emit("sendMessage", {
      roomId,
      senderId: user.id,
      text,
    });

    setText("");
  };

  const leaveRoom = async () => {
    await api.post(`/api/rooms/${roomId}/leave`);
    navigate("/rooms");
  };

  return (
    <div style={{ maxWidth: 800, margin: "30px auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Room Chat</h2>
        <button onClick={leaveRoom} style={{ padding: 8, background: "#dc2626", color: "white" }}>
          Leave Room
        </button>
      </div>

      <div style={{ border: "1px solid #ddd", height: 400, overflowY: "scroll", padding: 10, marginTop: 10 }}>
        {messages.map((m) => (
          <div key={m._id} style={{ marginBottom: 12 }}>
            <b>{m.sender?.username || "User"}:</b> {m.text}
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type message..."
          style={{ flex: 1, padding: 10 }}
        />
        <button onClick={sendMessage} style={{ padding: 10, background: "#4f46e5", color: "white" }}>
          Send
        </button>
      </div>
    </div>
  );
}
