const mongodb = require("../database/database.js");
const { ObjectId } = require("mongodb");
const createError = require("http-errors");
const Joi = require("@hapi/joi");

// Define Joi schema for validating the data
// will have the schema here and not in other folder for simplicity. But can be moved to a separate file and imported.
const shelterSchema = Joi.object({
  name: Joi.string().min(3).required(),
  location: Joi.string().min(10).required(),
  number: Joi.string().min(10).required(),
  email: Joi.string().email().required(),
  availability: Joi.string().min(10).required(),
});

// GET method: Get all shelters
const getAll = async (req, res, next) => {
  try {
    const result = await mongodb
      .getDatabase()
      .db()
      .collection("shelters")
      .find();
    const shelters = await result.toArray();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(shelters);
  } catch (error) {
    next(
      createError(500, "An error occurred while fetching shelters: " + error)
    );
  }
};

// GET method: Get a single shelter by ID
const getSingle = async (req, res, next) => {
  try {
    const shelterId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDatabase()
      .db()
      .collection("shelters")
      .findOne({ _id: shelterId });

    if (result) {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(result);
    } else {
      next(createError(404, "Shelter not found"));
    }
  } catch (error) {
    next(
      createError(500, "An error occurred while fetching the shelter: " + error)
    );
  }
};

// POST method: Add a new shelter
const addShelter = async (req, res, next) => {
  try {
    const validatedShelter = await shelterSchema.validateAsync(req.body);

    const result = await mongodb
      .getDatabase()
      .db()
      .collection("shelters")
      .insertOne(validatedShelter);

    if (result.acknowledged) {
      res.status(201).send("Shelter added successfully");
    } else {
      next(createError(400, "Failed to add shelter"));
    }
  } catch (error) {
    if (error.isJoi) {
      next(createError(400, "Invalid data format"));
    } else {
      next(
        createError(500, "An error occurred while adding the shelter: " + error)
      );
    }
  }
};

// PUT method: Update a shelter by ID
const updateShelter = async (req, res, next) => {
  try {
    const shelterId = new ObjectId(req.params.id);
    const validatedShelter = await shelterSchema.validateAsync(req.body);

    const result = await mongodb
      .getDatabase()
      .db()
      .collection("shelters")
      .updateOne({ _id: shelterId }, { $set: validatedShelter });

    if (result.matchedCount === 0) {
      return next(createError(404, "Shelter not found"));
    }

    if (result.modifiedCount > 0) {
      res.status(200).send("Shelter updated successfully");
    } else {
      next(createError(400, "No changes were made"));
    }
  } catch (error) {
    console.error("Error updating shelter:", error);
    next(
      createError(500, "An error occurred while updating the shelter: " + error)
    );
  }
};

// DELETE method: Delete a shelter by ID
const deleteShelter = async (req, res, next) => {
  try {
    const shelterId = new ObjectId(req.params.id);

    const result = await mongodb
      .getDatabase()
      .db()
      .collection("shelters")
      .deleteOne({ _id: shelterId });

    if (result.deletedCount === 0) {
      return next(createError(404, "Shelter not found"));
    }

    res.status(200).send("Shelter deleted successfully");
  } catch (error) {
    console.error("Error deleting shelter:", error);
    next(
      createError(500, "An error occurred while deleting the shelter: " + error)
    );
  }
};

module.exports = {
  getAll,
  getSingle,
  addShelter,
  updateShelter,
  deleteShelter,
};
