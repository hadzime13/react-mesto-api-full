const jwt = require('jsonwebtoken');
const { Forbidden } = require('../errors/index');
const { JWT_SECRET } = require('../config/index');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new Forbidden('Необходима авторизация');
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(
      token,
      JWT_SECRET
    );
  } catch (err) {
    throw new Forbidden('Необходима авторизация');
  }
  req.user = payload;
  console.log(JWT_SECRET);
  next();
};

module.exports = auth;
