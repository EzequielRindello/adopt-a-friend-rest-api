const express = require("express");
const router = require("express").Router();

const dogController = require("../controllers/dogController.js");

//const { isAuthenticated } = require("../middleware/autenticate.js");

// endpoints
router.get("/", dogController.getAll);

router.get("/:id", dogController.getSingle);

//router.post("/", isAuthenticated, shelterController.addDog);
router.post("/", dogController.addDog);

//router.put("/:id", isAuthenticated, shelterController.updateDog);
router.put("/:id", dogController.updateDog);

//router.delete("/:id", isAuthenticated, shelterController.deleteDog);
router.delete("/:id", dogController.deleteDog);

module.exports = router;
