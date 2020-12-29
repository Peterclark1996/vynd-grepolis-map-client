const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
    const world = req.query.world
    const players = [{
        id: 0,
        name: "Player 1",
        alliance: 0,
        points: 99999
    }, {
        id: 1,
        name: "Player 2",
        alliance: 1,
        points: 55599
    }]
    res.send(players);
});

module.exports = router;