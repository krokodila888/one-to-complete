const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const isEmail = require('validator/lib/isEmail');
const isURL = require('validator/lib/isURL');
const {
  ERROR_MESSAGE,
} = require('../utils/utils');
// const AuthError = require('../errors/AuthError');

const ownerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: 'Тут все еще воробей, но теперь это поправимо',
  },
  role: {
    type: String,
    required: true,
    default: 'admin',
  },
  about: {
    type: String,
    required: true,
    default: 'Грач хочет поговорить с Листвичкой, но Грозовой патруль приводит к нему Воробья, потому что Листвичка занята. Грач объясняет, что племени Ветра нужна помощь Грозового, и Воробей догадывается, что Однозвёзд даже не знает, что Грач обратился к соседям. Воин Ветра делится с Воробьём своим беспокойством по поводу горностаев, и Воробей, хотя и не без ворчания, соглашается поговорить с Ежевичной Звездой.',
  },
  avatar: {
    type: String,
    default: 'https://kartinkin.net/uploads/posts/2022-02/1645374223_26-kartinkin-net-p-vorobei-kartinki-26.jpg',
    validate: {
      validator: (v) => isURL(v),
      message: 'Неправильный формат ссылки',
    },
  },
  background: {
    type: String,
    default: 'https://img1.fonwall.ru/o/yx/sea-water-nature-wave.jpeg?route=mid&h=750',
    validate: {
      validator: (v) => isURL(v),
      message: 'Неправильный формат ссылки',
    },
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (v) => isEmail(v),
      message: ERROR_MESSAGE.WRONG_EMAIL,
    },
  },
  password: {
    type: String,
  //  select: false,
  },
});

// eslint-disable-next-line func-names
/* userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password').orFail(new AuthError('Данный пользователь не зарегистрирован'))
    .then((user) => bcrypt.compare(password, user.password)
      .then((matched) => {
        if (!matched) {
          throw new AuthError('Неправильные почта или пароль');
        }
        return user;
      }));
}; */

module.exports = mongoose.model('owner', ownerSchema);
