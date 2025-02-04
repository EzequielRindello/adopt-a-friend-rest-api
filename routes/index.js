const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("RESTful API project for managing dog adoptions");
});


module.exports = router;