const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('cors');
const { SERVER_PORT, DB } = require('./utils/config');
const limiter = require('./middlewares/rateLimiter');
const errorProcessor = require('./middlewares/errorprocessor');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const NotFoundError = require('./errors/notfound');

const app = express();
app.use(helmet());

mongoose
  .connect(DB)
  .then(() => {
    console.log('БД успешно подключена');
  })
  .catch((err) => {
    console.log(`Ошибка подключения: ${err}`);
  });

app.use(cors());

app.use(express.json());
app.use(limiter);
app.use(requestLogger); // подключаем логгер запросов

app.use(require('./routes/index'));

app.use('*', (reg, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors());

app.use(errorProcessor);

app.listen(SERVER_PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`server starting, app listening on port ${SERVER_PORT}`);
  }
});
