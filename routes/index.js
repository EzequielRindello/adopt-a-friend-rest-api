const router = require("express").Router();

router.use("/", require("./swagger.js"));

router.get("/", (req, res) => {
  //#swagger.tags = ['Home']
  res.send("RESTful API project for managing dog adoptions");
});

router.use("/dogs", require("./dogs.js"));

router.use("/shelters", require("./shelters.js"));

module.exports = router;
