import express from 'express'
const router = express.Router()
import { GetLiveWorldState } from "../ServiceF.js"

router.get('/', function (req, res, next) {
    const world = req.query.world
    if (world == null || world === "") {
        res.status(400).send('Invalid world')
        return
    }

    res.send(GetLiveWorldState(world).alliances)
});

export default router