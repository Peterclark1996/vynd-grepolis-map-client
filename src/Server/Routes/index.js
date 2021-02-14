import express from 'express'
const router = express.Router()

router.get('/', function (req, res, next) {
  res.sendFile('./build/index.html')
});

export default router