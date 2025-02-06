const mongodb = require("../database/database.js");
const { ObjectId } = require("mongodb");
const createError = require("http-errors");
const Joi = require("@hapi/joi");

// Define Joi schema for validating the data
// will have the schema here and not in other folder for simplicity. But can be moved to a separate file and imported.
const dogSchema = Joi.object({
  name: Joi.string().min(1).required(),
  breed: Joi.string().min(3).required(),
  age: Joi.number().integer().min(0).required(),
  size: Joi.string().valid("Small", "Medium", "Large").required(),
  shelterId: Joi.string().hex().length(24).required(), // MongoDB ObjectId
  adopted: Joi.boolean().required(),
  description: Joi.string().min(10).required(),
  vaccinated: Joi.boolean().required(),
});

// GET method: Get all dogs
const getAll = async (req, res, next) => {
  //#swagger.tags = ['Dogs']
  try {
    const result = await mongodb.getDatabase().db().collection("dogs").find();
    const shelters = await result.toArray();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(shelters);
  } catch (error) {
    next(createError(500, "An error occurred while fetching dogs: " + error));
  }
};

// GET method: Get a single dogs by ID
const getSingle = async (req, res, next) => {
  //#swagger.tags = ['Dogs']
  try {
    const dogId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDatabase()
      .db()
      .collection("dogs")
      .findOne({ _id: dogId });

    if (result) {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(result);
    } else {
      next(createError(404, "Dog not found"));
    }
  } catch (error) {
    next(
      createError(500, "An error occurred while fetching the dogs: " + error)
    );
  }
};

// POST method: Add a new dog
const addDog = async (req, res, next) => {
  //#swagger.tags = ['Dogs']
  try {
    const validatedDog = await dogSchema.validateAsync(req.body);

    const result = await mongodb
      .getDatabase()
      .db()
      .collection("dogs")
      .insertOne(validatedDog);

    if (result.acknowledged) {
      res.status(201).send("Dog added successfully");
    } else {
      next(createError(400, "Failed to add Dog"));
    }
  } catch (error) {
    if (error.isJoi) {
      next(createError(400, "Invalid data format"));
    } else {
      next(
        createError(500, "An error occurred while adding the dog: " + error)
      );
    }
  }
};

// PUT method: Update a dog by ID
const updateDog = async (req, res, next) => {
  //#swagger.tags = ['Dogs']
  try {
    const dogId = new ObjectId(req.params.id);
    const validatedDog = await dogSchema.validateAsync(req.body);

    const result = await mongodb
      .getDatabase()
      .db()
      .collection("dogs")
      .updateOne({ _id: dogId }, { $set: validatedDog });

    if (result.matchedCount === 0) {
      return next(createError(404, "Dog not found"));
    }

    if (result.modifiedCount > 0) {
      res.status(200).send("Dog updated successfully");
    } else {
      next(createError(400, "No changes were made"));
    }
  } catch (error) {
    console.error("Error updating Dog:", error);
    next(
      createError(500, "An error occurred while updating the dogs: " + error)
    );
  }
};

// DELETE method: Delete a dog by ID
const deleteDog = async (req, res, next) => {
  //#swagger.tags = ['Dogs']
  try {
    const dogId = new ObjectId(req.params.id);

    const result = await mongodb
      .getDatabase()
      .db()
      .collection("dogs")
      .deleteOne({ _id: dogId });

    if (result.deletedCount === 0) {
      return next(createError(404, "Dog not found"));
    }

    res.status(200).send("Dog deleted successfully");
  } catch (error) {
    console.error("Error deleting Dog:", error);
    next(
      createError(500, "An error occurred while deleting the Dog: " + error)
    );
  }
};

module.exports = {
  getAll,
  getSingle,
  addDog,
  updateDog,
  deleteDog,
};
