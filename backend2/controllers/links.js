const Link = require('../models/link');
const {
  ERROR_MESSAGE,
} = require('../utils/utils');
const NotFoundError = require('../errors/NotFoundError');
const RequestError = require('../errors/RequestError');

module.exports.getLinks = (req, res, next) => {
  Link.find({})
    .then((links) => res.send({ data: links }))
    .catch((err) => next(err));
};

module.exports.createLink = (req, res, next) => {
  const { text, link, imageLink } = req.body;
  Link.create({ text, link, imageLink })
    .then((links) => res.send({ data: links }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new RequestError(ERROR_MESSAGE.CARD_POST));
      } else {
        next(err);
      }
    });
};

module.exports.deleteLink = (req, res, next) => {
  Link.findById(req.params.linkId)
    .then((link) => {
      if (!link) {
        throw new NotFoundError(ERROR_MESSAGE.CARD_DELETE_NO_ID);
      }
      Link.findByIdAndRemove(req.params.linkId)
        .then(() => res.send({ data: link }))
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

module.exports.editLink = (req, res, next) => {
  const {
    linkId, text, link, imageLink,
  } = req.body;
  const linkId1 = linkId;
  Link.findOneAndUpdate({ _id: linkId1 }, { text, link, imageLink })
    .then((link1) => {
      if (!link1) {
        next(new NotFoundError(ERROR_MESSAGE.LINK_NOT_FOUND));
      } else res.send({ data: link1 });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new RequestError(ERROR_MESSAGE.USER_PATCH_PROFILE_INV_DATA));
      } else {
        next(err);
      }
    });
};
