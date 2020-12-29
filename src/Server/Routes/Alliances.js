const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
    const world = req.query.world
    const alliances = [{
        id: 0,
        name: "Alliance 1 on world " + world,
        points: 99999,
        colour: "#8B5A00"
    }, {
        id: 1,
        name: "Alliance 2 on world " + world,
        points: 55599,
        colour: "#FF0000"
    }]
    res.send(alliances);
});

module.exports = router;