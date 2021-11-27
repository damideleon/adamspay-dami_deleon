var express = require('express');
var router = express.Router();

var axios = require("axios")
var moment = require("moment")

var db = require("../db")


const siExiste = "update"
const apiKey = "adams-14331675fbc0b2"
const host = "https://staging.adamspay.com"
const path = "/api/v1/debts"

router.get('/', async (req, res) => {
    db.query("SELECT * from test_table", [], (err, rs) => {
        res.json(rs.rows);
    });
})
//Registar una venta
.post("/", async (req, res, next) => {
    //todo insert cabecera
    db.query("insert into venta(venta_id, cliente_id, venta_precio_total, venta_fecha_hora, venta_cobro, venta_estado, venta_cobro_estado, venta_cobrada_fecha_hora)" +
    "values "+
    "((select max(coalesce(venta_id, 0))+1 from venta) "+
    "$1, $2, current_timestamp, 0, 'active', 'pending', current_timestamp) returning venta_id",
    [
        req.body.cliente_id,
        req.body.venta_precio_total
    ],
    (err, rs)=>{
        if(err){
            console.log(err.message)
            res.json({error: true, message: "No se pudo insertar la cabecera"})
        }
    });

    //todo insert detalle
    db.query("", [], (err, rs)=>{

    });

    deuda = {
        "docId": req.query.idDeuda,
        "amount": 
            {
                "currency": "PYG",
                "value": req.query.value
            },
        "label": req.query.label,
        "validPeriod": {
            "start": moment().utc().format(),
            "end": moment().add(2, "days").utc().format()
        }
    }
    try {
        axios({
            method: 'POST',
            baseURL: host,
            url: path,
            headers : {
				"apikey": apiKey,
				"Content-Type": "application/json",
				"x-if-exists": siExiste},
            data: {"debt" : deuda}
        })
        .then((response)=>{
			console.log(response.data)
			var urlPago = response.data.debt.payUrl || ""
            if(urlPago != ""){
                res.redirect(urlPago)
            } else {
                //console.error(response.meta)
                //res.json(response.meta)
                res.sendStatus(201)
            }
        });
    } catch(e) {
        console.error(e)
    }
});
module.exports = router;