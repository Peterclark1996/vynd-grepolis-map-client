import express from 'express'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import createError from 'http-errors'
import cors from 'cors'
import mongoose from 'mongoose'

import { GetConfigDatasourceUrl, IsProduction } from './ConfigF.js'
import { Log, LogError } from './LogF.js'

import indexRouter from './Routes/Index.js'
import getWorldsRouter from './Routes/GetWorlds.js'
import getWorldDataRouter from './Routes/GetWorldData.js'

const app = express();

app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/getWorlds', getWorldsRouter);
app.use('/getWorldData', getWorldDataRouter);

app.use('/grepolis-live-map', express.static(process.cwd() + '/build'))

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = IsProduction() ? {} : err

  res.status(err.status || 500);
  res.json({
    error: err
  });
});

mongoose.set('useCreateIndex', true)
const url = GetConfigDatasourceUrl()
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.once('open', _ => Log('MongoDB connected'))
db.on('error', error => LogError('MongoDB connection error:', error))

export default app