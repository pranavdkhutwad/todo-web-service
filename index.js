const mongoose = require("mongoose");
const express = require("express");
const morgan = require("morgan");
const app = express();
const todos = require("./routes/todos");
const users = require("./routes/users");
const home = require("./routes/home");
const logger = require("./middlewares/logger");
// const auth = require("./middlewares/authentication");
const auth = require("./routes/auth");
require("dotenv").config({ path: `${__dirname}/.env` });

// Middleware
// It is a function which accepts a request
// and process it and returns response to the client
// or send req to next middleware using next() function.

// automatically import pug template in your app
app.set("view engine", "pug");
// set view location
app.set("views", "./views");

app.use(express.json()); // built-in middleware
app.use(express.static("public")); // built-in middleware
app.use(morgan("tiny"));
app.use(logger); // custom middleware
// app.use(auth); // custom middleware
app.use("/", home); // routers
app.use("/api/todos", todos); // routers.
app.use("/api/users", users);
app.use("/api/auth", auth);

const port = process.env.PORT || 3000;

app.listen(port, async () => {
  try {
    await mongoose.connect(`${process.env["PROD_DB_URL"]}`);
    console.log("MongoDB connected");
    console.log(`Server has started on port ${port}`);
  } catch (err) {
    console.log("Something went wrong...", err);
  }
});
