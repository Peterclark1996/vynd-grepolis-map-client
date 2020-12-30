import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import createError from 'http-errors'
import cors from 'cors'

import indexRouter from './Routes/index.js'
import worldsRouter from './Routes/Worlds.js'
import alliancesRouter from './Routes/Alliances.js'
import playersRouter from './Routes/Players.js'
import citiesRouter from './Routes/Cities.js'

const app = express();

app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//TODO Stop express picking up /public/index.html as a base page
//app.use(express.static(path.join(__dirname, '../../public')));

app.use('/', indexRouter);
app.use('/worlds', worldsRouter);
app.use('/alliances', alliancesRouter);
app.use('/players', playersRouter);
app.use('/cities', citiesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.json({
    error: err
  });
});

export default app