import express from 'express'
import { GetWorlds } from '../Services/WorldsService.js'
const router = express.Router()
import { LogError } from "../Util/LogF.js"

router.get('/', function (req, res, next) {
    GetWorlds()
        .then(worlds => {
            res.send(worlds);
        })
        .catch(error => {
            LogError(error)
            res.status(500).send("Internal Server Error: 500")
        })
});

export default router