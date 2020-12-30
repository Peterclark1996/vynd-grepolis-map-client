import express from 'express'
const router = express.Router()

const GetEnv = () => !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? 'Dev' : 'Prod'

//TODO Make the root serve the static web app that is already built with the heroku-postbuild script 
router.get('/', function (req, res, next) {
  res.send('[' + GetEnv() + '] VynD Grepolis Map API');
});

export default router