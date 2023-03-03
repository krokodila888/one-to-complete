const Announcement = require('../models/announcement');
const {
  ERROR_MESSAGE,
} = require('../utils/utils');
const NotFoundError = require('../errors/NotFoundError');
const RequestError = require('../errors/RequestError');

module.exports.getAnnouncements = (req, res, next) => {
  Announcement.find({})
    .then((announcements) => res.send({ data: announcements }))
    .catch((err) => next(err));
};

module.exports.createAnnouncement = (req, res, next) => {
  const {
    title, subTitle, text, date, timeField, broadcastLink, imageLink, type,
  } = req.body;
  Announcement.create({
    title, subTitle, text, date, timeField, broadcastLink, imageLink, type,
  })
    .then((announcements) => res.send({ data: announcements }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new RequestError(ERROR_MESSAGE.CARD_POST));
      } else {
        next(err);
      }
    });
};

module.exports.deleteAnnouncement = (req, res, next) => {
  Announcement.findById(req.params.announcementId)
    .then((announcement) => {
      if (!announcement) {
        throw new NotFoundError(ERROR_MESSAGE.CARD_DELETE_NO_ID);
      }
      Announcement.findByIdAndRemove(req.params.announcementId)
        .then(() => res.send({ data: announcement }))
        .catch((err) => next(err));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new RequestError(ERROR_MESSAGE.CARD_DEL_WRONG_ID));
      } else {
        next(err);
      }
    });
};

module.exports.editAnnouncement = (req, res, next) => {
  const {
    annId, title, subTitle, text, date, timeField, broadcastLink, imageLink, type,
  } = req.body;
  const annId1 = annId;
  Announcement.findOneAndUpdate({ _id: annId1 }, {
    title, subTitle, text, date, timeField, broadcastLink, imageLink, type,
  })
    .then((announcement) => {
      if (!announcement) {
        next(new NotFoundError(ERROR_MESSAGE.LINK_NOT_FOUND));
      } else { res.send({ data: announcement }); console.log(announcement); }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new RequestError(ERROR_MESSAGE.USER_PATCH_PROFILE_INV_DATA));
      } else {
        next(err);
      }
    });
};
