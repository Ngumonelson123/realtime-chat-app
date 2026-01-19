const User = require("../models/User");
const bcrypt = require("bcrypt.js");
const jwt = require("jsonwebtoken");

// REGISTER
const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !passsword)
            return res.status(400).json({ message: "All fields are required" });

        const existingEmail = await User.findOne({ email });
        if (existingEmail) return res.status(400).json({ message: "Email already exists" });

        const existingUsername = await User.findOne({ username });
        if (existingUsername) return res.status(400).json({ message: "Username already exists"});

        const salt = await bycrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            username,
            email,
            password: hashedPassword,
        });
        return res.status(201).json({ message: "User registered sucessfully"});

    } catch (erro) {
        return res.status(500).json({ message: error.message });
    }
};

// LOGIN

const LoginUser = async