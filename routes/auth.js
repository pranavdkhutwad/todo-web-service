const express = require("express");
const router = express.Router();
const { User, validateLogin } = require("../models/user");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  const { error } = validateLogin(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  // Mongodb Operation.
  try {
    let user = await User.findOne({ email: req.body.email });

    if (!user) return res.status(401).send("Invalid email or password");

    if (req.body.password !== user.password)
      return res.status(401).send("Invalid email or password");

    const token = jwt.sign({ _id: user._id }, process.env["JWT_PRIVATE_KEY"]);

    res.send(token);
  } catch (ex) {
    console.log(ex);
  }
});

module.exports = router;
