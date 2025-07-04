const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

const signup = async (req, res) => {
  const { username, email, password } = req.body;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  try {
    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields must be filled" });
    }
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: "Username is already taken" });
    }
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email is already taken" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ username, email, password: hashedPassword });

    await newUser.save();
    generateToken(newUser._id, res);

    return res.status(201).json({
      message: "User created successfully",
      user: {
        ...newUser._doc,
        password: "",
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    console.log("Error in signup controller: ", error.message);
  }
};
const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      return res.status(400).json({ error: "All fields must be filled" });
    }
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "Invalid credentials" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    generateToken(user._id, res);

    return res.status(200).json({
      message: "Login successfully",
      user: {
        ...user._doc,
        password: "",
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    console.log("Error in login controller: ", error.message);
  }
};
const logout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    return res.status(200).json({ message: "Logout successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    console.log("Error in logout controller: ", error.message);
  }
};

const getMe = async (req, res) => {
  try {
    return res.status(200).json({ user: req.user });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    console.log("Error in getMe controller: ", error.message);
  }
};

module.exports = { signup, login, logout, getMe };
