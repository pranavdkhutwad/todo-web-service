const express = require("express");
const router = express.Router();
const { Todo, validate } = require("../models/todo");
const auth = require("../middlewares/auth");

router.get("/", auth, async (req, res) => {
  const todoList = await Todo.find();

  res.send(todoList);
});

router.get("/:id", auth, async (req, res) => {
  const id = req.params.id;

  try {
    const todo = await Todo.findById(id);
    res.send(todo);
  } catch (err) {
    res.status(404).send("This given id does not found");
    return;
  }
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);

  if (error) {
    res.send(error.details[0].message);
    return;
  }

  const { name, desc, priority } = req.body;
  const todo = new Todo({
    name,
    desc,
    priority,
  });

  // Mongodb Operation.
  try {
    const response = await todo.save(); // save data into database.
    res.send(response);
  } catch (ex) {
    console.log(ex);
  }
});

router.put("/:id", auth, async (req, res) => {
  // retrieve id from param
  const id = req.params.id;
  // retrieve request body and validate it.
  const { error } = validate(req.body);

  if (error) {
    res.send(error.details[0].message);
    return;
  }

  try {
    // 1.
    const todo = await Todo.findById(id);

    // 2.
    todo.set({
      ...req.body,
    });

    // 3.
    const response = await todo.save();

    res.send(response);
  } catch (err) {
    console.log(err);
  }
});

router.delete("/:id", auth, async (req, res) => {
  // retrieve id from param
  const id = req.params.id;

  const response = await Todo.deleteOne({ _id: id });

  res.send(response);
});

module.exports = router;
