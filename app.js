const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const database  = require("./database/database.js");

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