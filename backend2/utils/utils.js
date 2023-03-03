const ERROR_CODE_WRONG_DATA = 400;
const ERROR_CODE_NOT_FOUND = 404;
const ERROR_CODE_WRONG_CARD = 403;
const ERROR_CODE_DEFAULT = 500;
const RES_OK_CODE = 200 || 201;

const ERROR_MESSAGE = {
  USER_POST: 'Переданы некорректные данные при создании пользователя.',
  SOMETHING_WRONG: 'Ошибка по умолчанию.',
  USER_GET_ID: 'Пользователь по указанному _id не найден.',
  USER_PATCH_PROFILE_INV_DATA: 'Переданы некорректные данные при обновлении профиля.',
  USER_PATCH_ID_NOT_FOUND: 'Пользователь с указанным _id не найден.',
  CARD_POST: 'Переданы некорректные данные при создании записи.',
  CARD_DELETE_NO_ID: 'Запись с указанным _id не найдена. Что-то пошло не так',
  DELETE_LIKE_NO_ID: 'Передан несуществующий _id записи.',
  CARD_DEL_WRONG_ID: 'Передан некорректный _id.',
  LINK_NOT_FOUND: 'Ссылка с таким ID не найдена',
};

const URL_PATTERN = /^:?https?:\/\/(www\.)?[a-zA-Z\d-]+\.[\w\d\-.~:/?#[\]@!$&'()*+,;=]{2,}#?$/;

module.exports = {
  ERROR_CODE_WRONG_DATA,
  ERROR_CODE_NOT_FOUND,
  ERROR_CODE_WRONG_CARD,
  ERROR_CODE_DEFAULT,
  ERROR_MESSAGE,
  RES_OK_CODE,
  URL_PATTERN,
};
