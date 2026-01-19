const mongoose = require("mongoose");
const roomSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true, trim: true },
        members: [{ type: mongoose.Schema.Types.ObjectsId, ref: "User" }],
    },
    { timestamps: true}
);

module.exports = mongoose.model("Room", roomSchema);