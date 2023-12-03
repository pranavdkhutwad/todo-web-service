const mongoose = require("mongoose");
const Joi = require("joi");

const todoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  priority: {
    type: Number,
    required: true,
  },
});

const Todo = mongoose.model("Todo", todoSchema);

function validate(payload) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    desc: Joi.string().required(),
    priority: Joi.number().integer().required(),
  });

  return schema.validate(payload);
}

module.exports = {
  Todo,
  validate,
};
