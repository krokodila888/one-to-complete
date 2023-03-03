const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const RequestError = require('../errors/RequestError');
const NotFoundError = require('../errors/NotFoundError');

const { NODE_ENV, JWT_SECRET } = process.env;

const Owner = require('../models/owner');
const {
  ERROR_MESSAGE,
} = require('../utils/utils');

module.exports.getOwner = (req, res, next) => {
  Owner.find({})
    .then((owner) => res.send({ data: owner }))
    .catch((err) => next(err));
};

module.exports.editOwnersProfile = (req, res, next) => {
  const {
    name, about, avatar, background, email,
  } = req.body;
  const name1 = name;
  const email1 = email;
  const about1 = about;
  const avatar1 = avatar;
  const background1 = background;
  bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      Owner.findOneAndUpdate({ role: 'admin' }, {
        name: name1,
        email: email1,
        about: about1,
        avatar: avatar1,
        background: background1,
        password: hash,
      })
        /* (
          id1,
          { name1, about1, avatar1, background1, password1: hash },
          {
            new: true,
            runValidators: true,
            upsert: false
          }
        ) */
        // })
        .then((user) => {
          if (!user) {
            next(new NotFoundError(ERROR_MESSAGE.USER_GET_ID));
          } else res.send({ data: user });
        });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new RequestError(ERROR_MESSAGE.USER_PATCH_PROFILE_INV_DATA));
      } else {
        next(err);
      }
    });
};

module.exports.setOwner = (req, res, next) => {
  const {
    name, about, avatar, background, email,
  } = req.body;
  bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      Owner.create({
        name, about, avatar, background, email, password: hash,
      })
        .then((owner) => res.send({
          name: owner.name,
          role: 'admin',
          about: owner.about,
          avatar: owner.avatar,
          background: owner.background,
          email: owner.email,
        }))
        .catch((err) => {
          if (err.name === 'ValidationError') {
            throw new RequestError(ERROR_MESSAGE.USER_POST);
          } else {
            next(err);
          }
        });
    })
    .catch((err) => next(err));
};

module.exports.login = (req, res, next) => {
  const { password } = req.body;
  return Owner.find({})
    .then((owner) => {
      const owner1 = owner[0];
      const id1 = owner1._id;
      const matched = bcrypt.compare(password, owner1.password);
      return { matched, id1 };
    })
    .then((matched, id1) => {
      if (!matched) {
        // хеши не совпали — отклоняем промис
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }
      const token = jwt.sign(
        { _id: id1 },
        NODE_ENV === 'production' ? JWT_SECRET : 'strong-secret',
        { expiresIn: '7d' },
      );
      res
        .cookie('jwt', token, {
          maxAge: 3600000,
          httpOnly: true,
          sameSite: true,
          secure: true,
        })
        .send({ message: 'Вход выполнен' });
    })
    .catch(next);
};

module.exports.logout = (req, res, next) => {
  res.clearCookie('jwt').send({ message: 'Вы точно вышли из профиля' })
    .catch(next);
};
