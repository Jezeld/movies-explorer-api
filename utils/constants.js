const ERROR_CODE_UNIQUE = 11000;
const STATUS_OK = 200;
const STATUS_OK_201 = 201;

const NOT_FOUND = 'Запрашиваемый ресурс не найден';
const DUPLICATED_USER_ERROR = 'Данный email уже зарегистрирован';
const LOGIN_ERROR = 'Некорректные почта или пароль';
const NOT_FOUND_USER_ERROR = 'Пользователь не найден';
const BAD_REQUEST_ERROR = 'Переданные данные некорректны';
const NOT_FOUND_ID_ERROR = 'Ресурс с таким ID не найден';
const FORBIDDEN_ERROR = 'Запрещено удалять чужие фильмы';
const SERVER_ERROR = 'На сервере произошла ошибка';
const UNAUTHORIZED_ERROR = 'Необходимо авторизоваться';
const REGUESTS_ERROR = 'Превышено количество запросов на сервер';
const VALIDATION_URL_ERROR = 'Используйте корректную ссылку';
const VALIDATION_EMAIL_ERROR = 'Неправильный формат почты';

module.exports = {
  VALIDATION_URL_ERROR,
  VALIDATION_EMAIL_ERROR,
  REGUESTS_ERROR,
  UNAUTHORIZED_ERROR,
  NOT_FOUND,
  NOT_FOUND_ID_ERROR,
  DUPLICATED_USER_ERROR,
  FORBIDDEN_ERROR,
  SERVER_ERROR,
  LOGIN_ERROR,
  NOT_FOUND_USER_ERROR,
  BAD_REQUEST_ERROR,
  STATUS_OK,
  ERROR_CODE_UNIQUE,
  STATUS_OK_201,
};
