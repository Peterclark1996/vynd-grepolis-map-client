const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
    const worlds = [{
        code: 'en131',
        name: 'Chios'
    }, {
        code: 'en130',
        name: 'Bassae'
    }, {
        code: 'en129',
        name: 'Asine'
    }, {
        code: 'en128',
        name: 'Therma'
    }, {
        code: 'en127',
        name: 'Pseira'
    }, {
        code: 'en122',
        name: 'Kelenderis'
    }, {
        code: 'en121',
        name: 'Himera'
    }, {
        code: 'en112',
        name: 'Naucratis'
    }, {
        code: 'en45',
        name: 'Hyperborea'
    }, {
        code: 'en41',
        name: 'Bellerophon'
    }, {
        code: 'en32',
        name: 'Achilles'
    }]
    res.send(worlds);
});

module.exports = router;