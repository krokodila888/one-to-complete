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
  const { text, link, imageLink } = req.body;
  Link.findAndUpdate(req.link._id, { text, link, imageLink }, { new: true, runValidators: true })
    .then((currentLink) => {
      res.send({ data: currentLink });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new RequestError(ERROR_MESSAGE.USER_PATCH_PROFILE_INV_DATA));
      } else {
        next(err);
      }
    });
};
