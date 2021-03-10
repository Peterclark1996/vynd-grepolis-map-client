import express from 'express'
const router = express.Router()
import { GetMapImage } from "../Services/MapImageService.js"
import { LogError } from "../Util/LogF.js"
import { GetWorlds } from '../Services/WorldsService.js'

router.get('/', function (req, res, next) {
    const world = req.query.world
    const ocean = req.query.ocean
    if (!world || world === "undefined") {
        res.status(400).send('Invalid world')
        return
    }

    if (!ocean || ocean === "undefined") {
        res.status(400).send('Invalid ocean')
        return
    }

    GetWorlds()
        .then(worlds => {
            if (worlds.filter(w => w.code === world).length == 1) {
                GetMapImage(world, ocean)
                    .then(image => {
                        res.writeHead(200, {
                            'Content-Type': 'image/png',
                            'Content-Length': image.length
                        });
                        res.end(image);
                    })
            } else {
                res.status(400).send('Invalid world')
            }
        })
        .catch(error => {
            LogError(error)
            res.status(500).send("Internal Server Error: 500")
        })
});

export default router