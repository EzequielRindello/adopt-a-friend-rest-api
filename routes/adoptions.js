const express = require("express");
const router = require("express").Router();

const adoptionController = require("../controllers/adoptionController.js");

//const { isAuthenticated } = require("../middleware/autenticate.js");

// endpoints
router.get("/", adoptionController.getAll);

router.get("/:id", adoptionController.getSingle);

//router.post("/", isAuthenticated, shelterController.addDog);
router.post("/", adoptionController.addAdoption);

//router.put("/:id", isAuthenticated, shelterController.updateDog);
router.put("/:id", adoptionController.updateAdoption);

//router.delete("/:id", isAuthenticated, shelterController.deleteDog);
router.delete("/:id", adoptionController.deleteAdoption);

module.exports = router;
