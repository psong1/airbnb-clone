const express = require("express");
const router = express.Router();
const { User } = require("../../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const JWT_SECRET = process.env.JWT_SECRET;

router.get("/users", async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] }, // Use this to not send passwords
    });
    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ["password"] },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/users", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/users/:id", async (req, res) => {
  try {
    const user = await User.update(req.body, {
      where: { id: req.params.id },
    });
    if (!user[0]) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User updated successfully" });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.destroy({
      where: { id: req.params.id },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login attempt:", email); // Add this line
    const user = await User.findOne({ where: { email } });
    if (!user) {
      console.log("User not found for email:", email); // Add this line
    }
    if (!user || !(await user.checkPassword(password))) {
      console.log("Invalid password for email:", email); // Add this line
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
    console.error("Login error:", err); // Add this line
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
