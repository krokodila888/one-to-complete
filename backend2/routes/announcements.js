const announcementsRouter = require('express').Router();

const { celebrate, Joi } = require('celebrate');

const {
  createAnnouncement, deleteAnnouncement, editAnnouncement,
} = require('../controllers/announcements');

const {
  URL_PATTERN,
} = require('../utils/utils');

// announcementsRouter.get('/announcements', getAnnouncements);

announcementsRouter.post('/announcements', celebrate({
  body: Joi.object().keys({
    title: Joi.string().required(),
    subTitle: Joi.string(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    timeField: Joi.string(),
    broadcastLink: Joi.string(),
    imageLink: Joi.string().required().pattern(URL_PATTERN),
    type: Joi.number().required(),
  }),
}), createAnnouncement);

announcementsRouter.delete('/announcements/:announcementId', celebrate({
  params: Joi.object().keys({
    announcementId: Joi.string().length(24).hex().required(),
  }),
}), deleteAnnouncement);

announcementsRouter.patch('/announcements/:announcementId', celebrate({
  body: Joi.object().keys({
    annId: Joi.string().length(24).hex().required(),
    title: Joi.string(),
    subTitle: Joi.string(),
    text: Joi.string(),
    date: Joi.string(),
    timeField: Joi.string(),
    broadcastLink: Joi.string(),
    imageLink: Joi.string().pattern(URL_PATTERN),
    type: Joi.number(),
  }),
}), editAnnouncement);

module.exports = announcementsRouter;
