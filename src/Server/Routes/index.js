import express from 'express'
const router = express.Router()

import { IsProduction } from '../ConfigF.js'

//TODO Make the root serve the static web app that is already built with the heroku-postbuild script 
router.get('/', function (req, res, next) {
  res.send('[' + (IsProduction() ? 'Prod' : 'Dev') + '] VynD Grepolis Map API');
});

export default router