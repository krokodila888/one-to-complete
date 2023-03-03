const mongoose = require('mongoose');
const isURL = require('validator/lib/isURL');

const linkSchema = new mongoose.Schema({
  text: {
    type: String,
    default: 'Например, телеграм',
    required: true,
  },
  link: {
    type: String,
    default: 'Например, телеграм',
    required: true,
  },
  imageLink: {
    type: String,
    required: true,
    default: 'https://cdn.icon-icons.com/icons2/1342/PNG/512/paperplane_87602.png',
    validate: {
      validator: (v) => isURL(v),
      message: 'Неправильный формат ссылки',
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model(
  'link',
  linkSchema,
);
