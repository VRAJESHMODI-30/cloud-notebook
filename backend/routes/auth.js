const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  obj = {
    name: "Vrajesh Modi",
    id: 50,
  };
  res.json(obj);
});

module.exports = router;
