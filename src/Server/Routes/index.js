import express from 'express'
const router = express.Router()

router.get('/', function (req, res, next) {
  console.log(process.cwd() + '/build/index.html')
  res.sendFile('./build/index.html')
});

export default router