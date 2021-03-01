const errorHandler = (err, req, res, next) => {
  if (err.status) {
    return res.status(err.status).send({ message: err.message });
  }

  res.status(500).send({ message: err.message });
  return next();
};

module.exports = errorHandler;
