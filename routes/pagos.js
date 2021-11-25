var express = require('express');
var router = express.Router();

var axios = require("axios")
var moment = require("moment")

var s = moment().utc().format("Y-m-d[T]H:M:S")
var e = moment().add(2, "days").utc().format("Y-m-d[T]H:M:S")

console.log("Hoy: "+ s + " hasta: "+ e)


var db = require("../db")


const siExiste = "update"
const apiKey = "adams-14331675fbc0b2"
const host = "staging.adamspay.com"
const path = "/api/v1/debts"

router.get('/', async (req, res) => {

    db.query("SELECT * from test_table", [], (err, rs) => {
        res.json({ cool: true });
    });
}).post("/", (req, res, next) => {

    deuda =
    {
        "docId": req.body.idDeuda,
        "amount": 
            {
                "currency": "PYG",
                "value": req.body.monto
            },
        "label": req.body.label,
        "validPeriod": {
            "start": moment().utc().format("Y-m-d[T]H:M:S"),
            "end": moment().add(2, "days").utc().format("Y-m-d[T]H:M:S")
        }
    }


    axios({
        method: 'post',
        baseURL: host,
        url: path,
        headers : 
            {
                "apikey": apiKey,
                "Content-Type": "application/json",
                "x-if-exists": siExiste
            },
        data: {
            debt: deuda
        }
    })
    .then((response)=>{
        if(!("debt" in response)){
            res.redirect(response.debt)
        } else {
            console.error(response.meta)
            res.json(response.meta)
        }
    });
});


module.exports = router;