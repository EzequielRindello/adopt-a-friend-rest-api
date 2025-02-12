const express = require("express");
const dogController = require("../controllers/dogController");
const { authenticate, isAdmin } = require("../middleware/autenticate.js");

const router = express.Router();

// Public routes
router.get("/", dogController.getAll);
router.get("/:id", dogController.getSingle);

// Protected routes
router.post("/", authenticate, isAdmin, dogController.addDog);
router.put("/:id", authenticate, isAdmin, dogController.updateDog);
router.delete("/:id", authenticate, isAdmin, dogController.deleteDog);

module.exports = router;
