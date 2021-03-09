import express from 'express'
const router = express.Router()
import { GetMapImage } from "../Services/MapImageService.js"
import { LogError } from "../Util/LogF.js"

router.get('/', function (req, res, next) {
    const world = req.query.world
    const ocean = req.query.ocean
    if (world == null || world === "") {
        res.status(400).send('Invalid world')
        return
    }

    if (ocean == null || ocean === "") {
        res.status(400).send('Invalid ocean')
        return
    }
    GetMapImage(world, ocean)
        .then(image => {
            res.writeHead(200, {
                'Content-Type': 'image/png',
                'Content-Length': image.length
            });
            res.end(image);
        })
        .catch(error => {
            LogError(error)
            res.status(500).send("Internal Server Error: 500")
        })
});

export default router