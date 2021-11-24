var express = require('express');
var router = express.Router();

var db = require("../db")

router.get('/', async (req, res) => {

    db.query("SELECT * from test_table", [], (err, rs) => {
        res.json({data: rs});
    });
  })


module.exports = router;