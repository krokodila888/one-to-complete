require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors, celebrate, Joi } = require('celebrate');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { login, setOwner, getOwner } = require('./controllers/owner');
const { getAnnouncements } = require('./controllers/announcements');
const { getLinks } = require('./controllers/links');
const ownersRouter = require('./routes/owner');
const linksRouter = require('./routes/links');
const announcementsRouter = require('./routes/announcements');
const NotFoundError = require('./errors/NotFoundError');
const {
  URL_PATTERN,
} = require('./utils/utils');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3002 } = process.env;

const app = express();
const { cors } = require('./middlewares/corsHandler');

app.use(cors);
app.use(cookieParser());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(
  'mongodb://localhost:27017/mestodb',
  (err) => {
    if (err) throw err;
  },
);

const auth = require('./middlewares/auth');
const errorsHandler = require('./middlewares/errorsHandler');

app.use(requestLogger);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', celebrate({
  body: Joi.object().keys({
    password: Joi.string().required(),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(1).required(),
    about: Joi.string().min(1).required(),
    avatar: Joi.string().pattern(URL_PATTERN),
    background: Joi.string().pattern(URL_PATTERN),
    password: Joi.string().required(),
  }),
}), setOwner);

app.get('/owner', getOwner);
app.get('/links', getLinks);
app.get('/announcements', getAnnouncements);

app.use(auth);

app.use(ownersRouter);
app.use(announcementsRouter);
app.use(linksRouter);

app.get('/signout', (req, res) => {
  res.clearCookie('jwt').send({ message: 'Выход' });
});
// app.get('/signout', logout);

/* app.use(ownersRouter);
app.use(announcementsRouter);
app.use(linksRouter); */
app.use('*', () => {
  throw new NotFoundError('Вы сделали что-то не то. Вернитесь назад.');
});

app.use(errorLogger);
app.use(errors());
app.use(errorsHandler);
app.listen(PORT, () => {
  console.log(`App listen to ${PORT} port`);
});
