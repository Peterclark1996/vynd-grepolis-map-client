const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
    const world = req.query.world
    const cities = [{
        id: 0,
        name: "City name 1",
        player: 0,
        points: 3123,
        x: 0,
        y: 5
    }, {
        id: 1,
        name: "City name 2",
        player: 0,
        points: 7235,
        x: 5,
        y: 0
    }, {
        id: 2,
        name: "City name 3",
        player: 1,
        points: 11111,
        x: 3,
        y: 3
    }]
    res.send(cities);
});

module.exports = router;