const express = require('express');
const router = express.Router();

const GetEnv = () => !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? 'Dev' : 'Prod'

router.get('/', function (req, res, next) {
  res.send('[' + GetEnv() + '] VynD Grepolis Map API');
});

module.exports = router;
