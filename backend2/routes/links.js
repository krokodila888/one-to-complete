const linksRouter = require('express').Router();

const { celebrate, Joi } = require('celebrate');

const {
  URL_PATTERN,
} = require('../utils/utils');

const {
  getLinks, createLink, editLink, deleteLink
} = require('../controllers/links');

linksRouter.get('/links', getLinks);

linksRouter.patch('/links/:linkId', celebrate({
  body: Joi.object().keys({
    text: Joi.string().required(),
    link: Joi.string().required().pattern(URL_PATTERN),
    imageLink: Joi.string().required().pattern(URL_PATTERN),
  }),
}), editLink);

linksRouter.post('/links', celebrate({
  body: Joi.object().keys({
    text: Joi.string().required(),
    link: Joi.string().required().pattern(URL_PATTERN),
    imageLink: Joi.string().required().pattern(URL_PATTERN),
  }),
}), createLink);

linksRouter.delete('/links/:linkId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
}), deleteLink);

module.exports = linksRouter;
