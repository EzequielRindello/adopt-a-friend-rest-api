const express = require("express");
const router = express.Router();

const usersController = require("../controllers/usersController.js");
const { authenticate, isAdmin } = require("../middleware/autenticate.js");

// Public routes
router.get("/", usersController.getAll);
router.get("/:id", usersController.getSingle);

// Protected routes
router.post("/", authenticate, isAdmin, usersController.addUser);
router.put("/:id", authenticate, isAdmin, usersController.updateUser);
router.delete("/:id", authenticate, isAdmin, usersController.deleteUser);

module.exports = router;
