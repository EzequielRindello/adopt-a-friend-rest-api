const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const database = require("./database/database.js");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const createError = require("http-errors");
const cors = require("cors");

app.use(bodyParser.json());
app.use(cookieParser());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Origin",
    "Origin, X-Requested-With, Content-Type, Accept, Z-Key"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  next();
});
app.use(cors({ methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"] }));
app.use(cors({ origin: "*" }));
app.use("/", require("./routes/index.js"));

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404, "Route not found"));
});

// Error handler middleware (must be at the end of all routes)
app.use((err, req, res, next) => {
  // If the error is not a HTTP error, we create one
  if (!err.status) {
    err = createError(500, err.message || "Internal Server Error");
  }
  // Send the response
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).send(message);
});

// Connect to MongoDB
database.intDb((err) => {
  if (err) {
    console.log("Error connecting to MongoDB");
    process.exit(1);
  } else {
    console.log("Connected to MongoDB");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
