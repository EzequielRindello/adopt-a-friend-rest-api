const express = require("express");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const database = require("../database/database");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

router.get("/", (req, res) => {
  res.send("Auth route, please use /login to login or /register to register");
});

// Login
router.post(
  "/login",
  [body("email").isEmail(), body("name").isLength({ min: 3 })],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, name } = req.body;
    const db = database.getDatabase().db();
    const user = await db.collection("users").findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    if (user.name !== name) {
      return res.status(401).json({ message: "Incorrect name" });
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: "1h",
    });

    await db.collection("sessions").insertOne({ userId: user._id, token });

    res.json({ token });
  }
);

// Logout
router.post("/logout", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const db = database.getDatabase().db();
  await db.collection("sessions").deleteOne({ token });

  res.json({ message: "Session closed successfully" });
});

module.exports = router;
