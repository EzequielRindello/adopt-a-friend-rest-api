const express = require("express");
const router = express.Router();

const usersController = require("../controllers/usersController.js");
const { authenticate, isAdmin } = require("../middleware/autenticate.js");

// Protected routes
router.get("/", authenticate, isAdmin, usersController.getAll);
router.get("/:id", authenticate, isAdmin, usersController.getSingle);
router.post("/", authenticate, isAdmin, usersController.addUser);
router.put("/:id", authenticate, isAdmin, usersController.updateUser);
router.delete("/:id", authenticate, isAdmin, usersController.deleteUser);

module.exports = router;
