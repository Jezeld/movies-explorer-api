require('dotenv').config();

// забираем нужные переменные из .env
const {
  NODE_ENV, JWT_SECRET, DB_HOST, PORT,
} = process.env;

// задаем переменные с дефолтными (dev) значениями
const DEV_SECRET = 'SECRETSECRETSECRET';
const DEV_DB_HOST = 'mongodb://127.0.0.1:27017/bitfilmsdb';
const DEV_PORT = 3000;

// далее задаем переменные которые уже пойдут наружу

// если NODE_ENV === 'production' и DB_HOST существует (из .env)
// то используем DB_HOST, если нет — используем DEV_DB_HOST
// и так далее
const DB = NODE_ENV === 'production' && DB_HOST
  ? DB_HOST : DEV_DB_HOST;

const SERVER_PORT = NODE_ENV === 'production'
&& PORT ? PORT : DEV_PORT;

const SECRET_STRING = NODE_ENV === 'production'
&& JWT_SECRET ? JWT_SECRET : DEV_SECRET;

// выдаем наружу то что требуется
module.exports = {
  DB,
  SERVER_PORT,
  SECRET_STRING,
};
