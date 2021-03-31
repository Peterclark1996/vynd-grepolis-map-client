import express from 'express'
const router = express.Router()
import { LogError } from '../Util/LogF.js'
import { UpdateAllWorlds } from '../Services/WorldDataService.js'

router.get('/', function (req, res, next) {
    UpdateAllWorlds()
        .then(res.send("Successfully triggered worlds update"))
        .catch(error => {
            LogError(error)
            res.status(500).send("Internal Server Error: 500")
        })
});

export default router