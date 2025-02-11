const express = require("express");
const router = require("express").Router();

const usersController = require("../controllers/usersController.js");

//const { isAuthenticated } = require("../middleware/autenticate.js");

// endpoints
router.get("/", usersController.getAll);

router.get("/:id", usersController.getSingle);

//router.post("/", isAuthenticated, shelterController.addDog);
router.post("/", usersController.addUser);

//router.put("/:id", isAuthenticated, shelterController.updateDog);
router.put("/:id", usersController.updateUser);

//router.delete("/:id", isAuthenticated, shelterController.deleteDog);
router.delete("/:id", usersController.deleteUser);

module.exports = router;
