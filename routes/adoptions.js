const express = require("express");
const router = express.Router();

const adoptionController = require("../controllers/adoptionController.js");
const { authenticate, isAdmin } = require("../middleware/autenticate.js");

// Protected routes
router.get("/", authenticate, isAdmin, adoptionController.getAll);
router.get("/:id", authenticate, isAdmin, adoptionController.getSingle);
router.post("/", authenticate, isAdmin, adoptionController.addAdoption);
router.put("/:id", authenticate, isAdmin, adoptionController.updateAdoption);
router.delete("/:id", authenticate, isAdmin, adoptionController.deleteAdoption);

module.exports = router;
