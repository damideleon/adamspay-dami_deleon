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
.post("/", async (req, res, next) => {
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
                res.json(response.meta)
            }
        });
    } catch(e) {
        console.error(e)
    }
});
module.exports = router;