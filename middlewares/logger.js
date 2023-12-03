function logger(req, res, next) {
  console.log("Logging message");

  next();
}

module.exports = logger;
