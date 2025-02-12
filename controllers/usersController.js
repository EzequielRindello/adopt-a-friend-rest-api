const mongodb = require("../database/database.js");
const { ObjectId } = require("mongodb");
const createError = require("http-errors");
const Joi = require("@hapi/joi");

// Define Joi schema for validating user data
const userSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  role: Joi.string().valid("admin", "user").required(),
});

// GET method: Get all users
const getAll = async (req, res, next) => {
  //#swagger.tags = ['Users']
  try {
    const result = await mongodb.getDatabase().db().collection("users").find();
    const users = await result.toArray();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(users);
  } catch (error) {
    next(createError(500, "An error occurred while fetching users: " + error));
  }
};

// GET method: Get a single user by ID
const getSingle = async (req, res, next) => {
  //#swagger.tags = ['Users']
  try {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDatabase()
      .db()
      .collection("users")
      .findOne({ _id: userId });

    if (result) {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(result);
    } else {
      next(createError(404, "User not found"));
    }
  } catch (error) {
    next(
      createError(500, "An error occurred while fetching the user: " + error)
    );
  }
};

// POST method: Add a new user
const addUser = async (req, res, next) => {
  //#swagger.tags = ['Users']
  try {
    const validatedUser = await userSchema.validateAsync(req.body);

    const result = await mongodb
      .getDatabase()
      .db()
      .collection("users")
      .insertOne(validatedUser);

    if (result.acknowledged) {
      res.status(201).send("User added successfully");
    } else {
      next(createError(400, "Failed to add user"));
    }
  } catch (error) {
    if (error.isJoi) {
      next(createError(400, "Invalid data format"));
    } else {
      next(
        createError(500, "An error occurred while adding the user: " + error)
      );
    }
  }
};

// PUT method: Update a user by ID
const updateUser = async (req, res, next) => {
  //#swagger.tags = ['Users']
  try {
    const userId = new ObjectId(req.params.id);
    const validatedUser = await userSchema.validateAsync(req.body);

    const result = await mongodb
      .getDatabase()
      .db()
      .collection("users")
      .updateOne({ _id: userId }, { $set: validatedUser });

    if (result.matchedCount === 0) {
      return next(createError(404, "User not found"));
    }

    if (result.modifiedCount > 0) {
      res.status(200).send("User updated successfully");
    } else {
      next(createError(400, "No changes were made"));
    }
  } catch (error) {
    console.error("Error updating user:", error);
    next(
      createError(500, "An error occurred while updating the user: " + error)
    );
  }
};

// DELETE method: Delete a user by ID
const deleteUser = async (req, res, next) => {
  //#swagger.tags = ['Users']
  try {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDatabase()
      .db()
      .collection("users")
      .deleteOne({ _id: userId });

    if (result.deletedCount === 0) {
      return next(createError(404, "User not found"));
    }

    res.status(200).send("User deleted successfully");
  } catch (error) {
    console.error("Error deleting user:", error);
    next(
      createError(500, "An error occurred while deleting the user: " + error)
    );
  }
};

module.exports = {
  getAll,
  getSingle,
  addUser,
  updateUser,
  deleteUser,
};
