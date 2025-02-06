const dontenv = require("dotenv");
dontenv.config();

const MongoClient = require("mongodb").MongoClient;

let database;

const intDb = (callback) => {
  if (database) {
    console.log("Database is already initialized");
    return callback(null, database);
  }
  MongoClient.connect(process.env.MONGODB_URI)
    .then((client) => {
      database = client;
      callback(null, database);
    })
    .catch((err) => {
      callback(err);
    });
};

const getDatabase = () => {
  if (!database) {
    throw new Error("Database is not initialized");
  }
  return database;
};

module.exports = { intDb, getDatabase };
