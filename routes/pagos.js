var express = require('express');
var router = express.Router();

var axios = require("axios")
var moment = require("moment")

var db = require("../db")


const siExiste = "update"
const apiKey = "adams-14331675fbc0b2"
const host = "staging.adamspay.com"
const path = "/api/v1/debts"

router.get('/', async (req, res) => {

    db.query("SELECT * from test_table", [], (err, rs) => {
        res.json({ cool: true });
    });
}).get("/new", async (req, res, next) => {

    deuda = {
        "docId": req.query.idDeuda,
        "amount": 
            {
                "currency": "PYG",
                "value": req.query.monto
            },
        "label": req.query.label,
        "validPeriod": {
            "start": moment().utc().format("Y-m-d[T]HH:MM:SS"),
            "end": moment().add(2, "days").utc().format("Y-m-d[T]HH:MM:SS")
        }
    }

    try {
        axios({
            method: 'POST',
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
    } catch(e) {
        console.error(e)
    }
    
});


module.exports = router;