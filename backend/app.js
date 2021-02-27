require('dotenv').config(); 
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const usersRouter = require('./routes/users.js');
const cardsRouter = require('./routes/cards.js');
const errorHandler = require('./middlewares/errorHandler');
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
const auth = require('./middlewares/auth');
const { NotFound } = require('./errors/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(bodyParser.json());
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use('/signup', registerRouter);
app.use('/signin', loginRouter);

// app.use(auth);

app.use('/users', auth, usersRouter);
app.use('/cards', auth, cardsRouter);
app.all('*', () => {
  throw new NotFound('Запрашиваемый ресурс не найден');
});

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Listening to ${PORT}`);
});
