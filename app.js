const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const database = require("./database/database.js");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use((req, res, next) => {
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
app.use("/", require("./routes/index.js"));

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
