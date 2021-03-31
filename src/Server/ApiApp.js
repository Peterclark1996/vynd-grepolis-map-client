import express from 'express'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import createError from 'http-errors'
import cors from 'cors'
import mongoose from 'mongoose'

import { GetConfigDatasourceUrl, IsProduction } from './Util/ConfigF.js'
import { Log, LogError } from './Util/LogF.js'

import indexRouter from './Routes/index.js'
import getWorldsRouter from './Routes/GetWorlds.js'
import getWorldDataRouter from './Routes/GetWorldData.js'
import getMapImageRouter from './Routes/GetMapImage.js'
import updateWorldDataRouter from './Routes/UpdateWorldData.js'

Log('Starting API')

const app = express()

app.use(cors())

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

Log('Adding routes')

app.use('/', indexRouter)
app.use('/getWorlds', getWorldsRouter)
app.use('/getWorldData', getWorldDataRouter)
app.use('/getMapImage', getMapImageRouter)
app.use('/updateWorldData', updateWorldDataRouter)

if (IsProduction()) {
  Log('Adding static folder "/"')
  app.use('/', express.static('./build'))
} else {
  Log('Adding static folder "/grepolis-live-map"')
  app.use('/grepolis-live-map', express.static('./build'))
}

Log('Adding middleware')

app.use(function (req, res, next) {
  next(createError(404))
})

app.use(function (err, req, res, next) {
  res.locals.message = err.message
  res.locals.error = IsProduction() ? {} : err

  res.status(err.status || 500)
  res.json({
    error: err
  })
})

Log('MongoDB connecting...')
mongoose.set('useCreateIndex', true)
const url = GetConfigDatasourceUrl()
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.once('open', _ => Log('MongoDB connected'))
db.on('error', error => LogError('MongoDB connection error:', error))

export default app