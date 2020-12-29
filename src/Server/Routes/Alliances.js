const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
    const alliances = [{
        id: 0,
        name: "Alliance name 1",
        points: 99999,
        colour: "#8B5A00"
    }, {
        id: 1,
        name: "Alliance name 2",
        points: 55599,
        colour: "#FF0000"
    }]
    res.send(alliances);
});

module.exports = router;