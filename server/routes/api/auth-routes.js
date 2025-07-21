const express = require("express");
const router = express.Router();
const { User } = require("../../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const JWT_SECRET = process.env.JWT_SECRET;

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      console.log("No user found for email:", email);
    } else {
      // const passwordMatch = await user.checkPassword(password);
      // // console.log("Password match:", passwordMatch);
    }
    if (!user || !(await user.checkPassword(password))) {
      return res
        .status(401)
        .json({ message: "Invalid email or password. Please try again." });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        first_name: user.first_name,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Login error", error: err.message });
  }
});

router.post("/signup", async (req, res) => {
  try {
    const { first_name, last_name, email, password, role } = req.body;
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: "Email already in use" });
    }
    const user = await User.create({
      first_name,
      last_name,
      email,
      password,
      role: role || "guest",
    });
    res.status(201).json({
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      role: user.role,
    });
  } catch (err) {
    res.status(500).json({ message: "Signup error", error: err.message });
  }
});

module.exports = router;
