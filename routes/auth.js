const express = require("express");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const database = require("../database/database");
const Joi = require("@hapi/joi");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().min(3).required(),
});

router.get("/", (req, res) => {
  res.send("Auth route, please use /login to login or /register to register");
});

router.post("/login", async (req, res, next) => {
  try {
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ errors: error.details });
    }

    const { email, name } = value;
    const db = database.getDatabase().db();
    const user = await db.collection("users").findOne({ email });

    if (!user || user.name !== name) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: new Date(Date.now() + 3600000),
    });

    res.json({ message: "Login successful, token set in cookie" });
  } catch (error) {
    next(createError(500, "Internal Server Error"));
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
});

module.exports = router;
