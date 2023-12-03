const express = require("express");
const router = express.Router();
const { User, validate } = require("../models/user");

router.post("/", async (req, res) => {
  const { error } = validate(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  // Mongodb Operation.
  try {
    let user = await User.findOne({ email: req.body.email });

    console.log(user);
    if (user) return res.status(400).send("User already exists");

    user = new User(req.body);

    const response = await user.save(); // save data into database.
    const { email, name, _id } = response;
    // const token = jwt.sign({ _id: user._id }, "jwtPrivateKey");
    // res.header('x-auth-token', token).send({ email, name, _id });
    res.send({ email, name, _id });
  } catch (ex) {
    console.log(ex);
  }
});

module.exports = router;
