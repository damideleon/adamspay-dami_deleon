var express = require('express');
var router = express.Router();

const db = require("../db");

router.get('/', async (req, res, next) =>{
    db.query("select v.*, cli.cliente_nombre from venta v join cliente cli on v.cliente_id = cli.cliente_id order by venta_id desc;", [], (err, result)=>{
        res.render("admin", {data: result.rows})
    })
})


module.exports = router;