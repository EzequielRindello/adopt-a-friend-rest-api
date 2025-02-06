const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("RESTful API project for managing dog adoptions");
});

router.use("/dogs", require("./dogs.js"));

router.use("/shelters", require("./shelters.js"));

module.exports = router;
