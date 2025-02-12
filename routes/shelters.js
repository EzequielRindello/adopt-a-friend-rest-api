const express = require("express");
const router = express.Router();

const shelterController = require("../controllers/shelterController.js");
const { authenticate, isAdmin } = require("../middleware/autenticate.js");

// Public routes
router.get("/", shelterController.getAll);
router.get("/:id", shelterController.getSingle);

// Protected routes
router.post("/", authenticate, isAdmin, shelterController.addShelter);
router.put("/:id", authenticate, isAdmin, shelterController.updateShelter);
router.delete("/:id", authenticate, isAdmin, shelterController.deleteShelter);

module.exports = router;
