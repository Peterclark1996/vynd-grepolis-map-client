import express from 'express'
const router = express.Router()
import { GetLiveWorldState } from "../ServiceF.js"

router.get('/', function (req, res, next) {
    const world = req.query.world
    if (world == null || world === "") {
        res.status(400).send('Invalid world')
        return
    }

    GetLiveWorldState(world)
        .then(worldState => res.send({
            alliances: worldState.alliances,
            players: worldState.players,
            cities: worldState.cities,
            islands: worldState.islands
        }))
});

export default router