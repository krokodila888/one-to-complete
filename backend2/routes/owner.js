const ownersRouter = require('express').Router();

const { celebrate, Joi } = require('celebrate');

const {
  URL_PATTERN,
} = require('../utils/utils');

const {
  getOwner, editOwnersProfile, setOwner
} = require('../controllers/owner');

ownersRouter.get('/owner', getOwner);

ownersRouter.patch('/owner/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string(),
    about: Joi.string(),
    avatar: Joi.string().pattern(URL_PATTERN),
    background: Joi.string().pattern(URL_PATTERN),
    password: Joi.string(),
  }),
}), editOwnersProfile);

/*ownersRouter.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string(),
    about: Joi.string(),
    avatar: Joi.string().pattern(URL_PATTERN),
    background: Joi.string().pattern(URL_PATTERN),
    password: Joi.string(),
  }),
}), setOwner);*/


module.exports = ownersRouter;
