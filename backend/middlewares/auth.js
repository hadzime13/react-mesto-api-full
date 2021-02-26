const jwt = require('jsonwebtoken');
const { Forbidden } = require('../errors/index');
// const { JWT_SECRET } = require('../config/index');

const auth = (req, res, next) => {
  const authorization  = req.headers.Authorization;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new Forbidden('Необходима авторизация');
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(
      token,
      'secret'
    );
  } catch (err) {
    throw new Forbidden('Необходима авторизация');
  }
  req.user = payload;
  next();
};

module.exports = auth;
