const linksRouter = require('express').Router();

const { celebrate, Joi } = require('celebrate');

/* const {
  URL_PATTERN,
} = require('../utils/utils'); */

const {
  createLink, editLink, deleteLink,
} = require('../controllers/links');

// linksRouter.get('/links', getLinks);

linksRouter.patch('/links/:linkId', celebrate({
  body: Joi.object().keys({
    linkId: Joi.string().length(24).hex().required(),
    text: Joi.string().required(),
    link: Joi.string().required(),
    imageLink: Joi.string().required(),
  }),
}), editLink);

linksRouter.post('/links', celebrate({
  body: Joi.object().keys({
    text: Joi.string().required(),
    link: Joi.string().required(),
    imageLink: Joi.string().required(),
  }),
}), createLink);

linksRouter.delete('/links/:linkId', celebrate({
  params: Joi.object().keys({
    linkId: Joi.string().length(24).hex().required(),
  }),
}), deleteLink);

module.exports = linksRouter;
