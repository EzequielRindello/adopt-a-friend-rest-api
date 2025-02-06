const express = require("express");
const router = require("express").Router();

const shelterController = require("../controllers/shelterController.js");

//const { isAuthenticated } = require("../middleware/autenticate.js");

// endpoints
router.get("/", shelterController.getAll);

router.get("/:id", shelterController.getSingle);

//router.post("/", isAuthenticated, shelterController.addDog);
router.post("/", shelterController.addShelter);

//router.put("/:id", isAuthenticated, shelterController.updateDog);
router.put("/:id", shelterController.updateShelter);

//router.delete("/:id", isAuthenticated, shelterController.deleteDog);
router.delete("/:id", shelterController.deleteShelter);

module.exports = router;
