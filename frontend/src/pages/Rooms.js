import React, { useEffect, useState } from "react";
import { api, setAuthToken } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Rooms() {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [roomName, setRoomName] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    setAuthToken(token);
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const res = await api.get("/api/rooms");
      setRooms(res.data);
    } catch (err) {
      setMsg("❌ Failed to load rooms");
    }
  };

  const createRoom = async () => {
    try {
      if (!roomName) return setMsg("Enter room name");
      await api.post("/api/rooms", { name: roomName });
      setRoomName("");
      fetchRooms();
    } catch (err) {
      setMsg(err.response?.data?.message || "Room create failed");
    }
  };

  const joinRoom = async (roomId) => {
    await api.post(`/api/rooms/${roomId}/join`);
    navigate(`/chat/${roomId}`);
  };

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div style={{ maxWidth: 700, margin: "40px auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Chat Rooms</h2>
        <button onClick={logout} style={{ padding: 8, background: "black", color: "white" }}>
          Logout
        </button>
      </div>

      <div style={{ display: "flex", gap: 10 }}>
        <input
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          placeholder="Create new room..."
          style={{ flex: 1, padding: 10 }}
        />
        <button onClick={createRoom} style={{ padding: 10, background: "#4f46e5", color: "white" }}>
          Create
        </button>
      </div>

      <p style={{ color: "red" }}>{msg}</p>

      <div style={{ marginTop: 20 }}>
        {rooms.map((room) => (
          <div
            key={room._id}
            style={{
              padding: 15,
              border: "1px solid #ddd",
              marginBottom: 10,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div>
              <b>{room.name}</b>
            </div>
            <button onClick={() => joinRoom(room._id)} style={{ padding: 8, background: "#16a34a", color: "white" }}>
              Join
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
