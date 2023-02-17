const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const RequestError = require('../errors/RequestError');

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
  const { name1, about1, avatar1, background1 } = req.body;
  bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      Owner.find({})
      .then((owner) => {
        const owner1 = owner[0];
        const id1 = owner1._id;
        console.log(id1);
        Owner.findOneAndUpdate({_id: id1}, { name1, about1, avatar1, background1, password1: hash })
/*        (
          id1,
          { name1, about1, avatar1, background1, password1: hash },
          {
            new: true,
            runValidators: true,
            upsert: false
          }
        )*/})})
        .then(owner => {res.send({ data: owner }); console.log(owner)})
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new RequestError(ERROR_MESSAGE.USER_PATCH_PROFILE_INV_DATA));
      } else {
        next(err);
      }
    });
  }/*)
}*/

module.exports.setOwner = (req, res, next) => {
  const {
    name, about, avatar, background
  } = req.body;
  bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      Owner.create({
        name, about, avatar, background, password: hash,
      })
        .then((owner) => res.send({
          name: owner.name, about: owner.about, avatar: owner.avatar, background: owner.background,
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
      return {matched, id1}
    })
    .then((matched, id1) => {
      if (!matched) {
        // хеши не совпали — отклоняем промис
        return Promise.reject(new Error('Неправильные почта или пароль'));
      };
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
/*
    .then((res) => {
      const token = jwt.sign(
        { _id: data.owner._id },
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
};*/

module.exports.logout = (req, res, next) => {
  res.clearCookie('jwt').send({ message: 'Вы точно вышли из профиля' })
    .catch(next);
};
