var express = require('express');
var router = express.Router();
const moment = require("moment");

const db = require("../db");

router.get('/', (req, res, next) =>{

    db.query("select * from venta", [], (err, result)=>{



        res.render("tienda", {data: result.rows, helpers: {
            hace(date){
                moment.locale("es")
                return moment(date).fromNow();
            },
            fecha(date){
                moment.locale("es")
                return moment(date).calendar();
            }
       }})
    })

   
})


module.exports = router;