const mongodb = require("../database/database.js");
const { ObjectId } = require("mongodb");
const createError = require("http-errors");
const Joi = require("@hapi/joi");

// Define Joi schema for validating adoption data
const adoptionSchema = Joi.object({
  userId: Joi.string().hex().length(24).required(),
  dogId: Joi.string().hex().length(24).required(),
  adoptionDate: Joi.date().iso().required(),
  status: Joi.string().valid("pending", "approved", "rejected").required(),
});

// GET method: Get all adoptions
const getAll = async (req, res, next) => {
  //#swagger.tags = ['Adoptions']
  try {
    const result = await mongodb
      .getDatabase()
      .db()
      .collection("adoptions")
      .find();
    const adoptions = await result.toArray();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(adoptions);
  } catch (error) {
    next(
      createError(500, "An error occurred while fetching adoptions: " + error)
    );
  }
};

// GET method: Get a single adoption by ID
const getSingle = async (req, res, next) => {
  //#swagger.tags = ['Adoptions']
  try {
    const adoptionId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDatabase()
      .db()
      .collection("adoptions")
      .findOne({ _id: adoptionId });

    if (result) {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(result);
    } else {
      next(createError(404, "Adoption not found"));
    }
  } catch (error) {
    next(
      createError(
        500,
        "An error occurred while fetching the adoption: " + error
      )
    );
  }
};

// POST method: Add a new adoption
const addAdoption = async (req, res, next) => {
  //#swagger.tags = ['Adoptions']
  try {
    const validatedAdoption = await adoptionSchema.validateAsync(req.body);

    const result = await mongodb
      .getDatabase()
      .db()
      .collection("adoptions")
      .insertOne(validatedAdoption);

    if (result.acknowledged) {
      res.status(201).send("Adoption request submitted successfully");
    } else {
      next(createError(400, "Failed to submit adoption request"));
    }
  } catch (error) {
    if (error.isJoi) {
      next(createError(400, "Invalid data format"));
    } else {
      next(
        createError(
          500,
          "An error occurred while submitting the adoption request: " + error
        )
      );
    }
  }
};

// PUT method: Update an adoption by ID
const updateAdoption = async (req, res, next) => {
  //#swagger.tags = ['Adoptions']
  try {
    const adoptionId = new ObjectId(req.params.id);
    const validatedAdoption = await adoptionSchema.validateAsync(req.body);

    const result = await mongodb
      .getDatabase()
      .db()
      .collection("adoptions")
      .updateOne({ _id: adoptionId }, { $set: validatedAdoption });

    if (result.matchedCount === 0) {
      return next(createError(404, "Adoption not found"));
    }

    if (result.modifiedCount > 0) {
      res.status(200).send("Adoption updated successfully");
    } else {
      next(createError(400, "No changes were made"));
    }
  } catch (error) {
    console.error("Error updating adoption:", error);
    next(
      createError(
        500,
        "An error occurred while updating the adoption: " + error
      )
    );
  }
};

// DELETE method: Delete an adoption by ID
const deleteAdoption = async (req, res, next) => {
  //#swagger.tags = ['Adoptions']
  try {
    const adoptionId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDatabase()
      .db()
      .collection("adoptions")
      .deleteOne({ _id: adoptionId });

    if (result.deletedCount === 0) {
      return next(createError(404, "Adoption not found"));
    }

    res.status(200).send("Adoption deleted successfully");
  } catch (error) {
    console.error("Error deleting adoption:", error);
    next(
      createError(
        500,
        "An error occurred while deleting the adoption: " + error
      )
    );
  }
};

module.exports = {
  getAll,
  getSingle,
  addAdoption,
  updateAdoption,
  deleteAdoption,
};
