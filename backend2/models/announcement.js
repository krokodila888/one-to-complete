const mongoose = require('mongoose');
const isURL = require('validator/lib/isURL');

const announcementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  subTitle: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  timeField: {
    type: String,
    required: true,
  },
  broadcastLink: {
    type: String,
  },
  imageLink: {
    type: String,
    required: true,
    validate: {
      validator: (v) => isURL(v),
      message: 'Неправильный формат ссылки',
    },
  },
  broadcastLink: {
    type: String,
  },
  type: {
    type: Number,
    required: true,
    default: 1,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('announcement',
announcementSchema);
