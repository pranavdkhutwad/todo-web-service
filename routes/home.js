const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", {
    title: "Express application",
    heading: "Welcome to Express",
  });
});

module.exports = router;
