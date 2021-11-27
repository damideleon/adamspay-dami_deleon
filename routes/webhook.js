var express = require('express');
var router = express.Router();

var md5 = require("md5");

//var axios = require("axios")
//var moment = require("moment")

const apiSecret = "adams-14331675fbc0b2";

var db = require("../db")

router.post("/", (req, res, next)=>{
	
	console.log(req.body)

	HMAC_esperado = md5("adams" + req.body + apiSecret);
	HMAC_recibido = req.headers['x-adams-notify-hash'];
	if(HMAC_esperado == HMAC_recibido){
		console.log("OK hash")
		res.sendStatus(200)
	} else {
		console.log('No ok Hash: ' + HMAC_esperado +' >><< ' + HMAC_recibido )
		res.sendStatus(200)
	}

	
	/*var notify = req;

	switch (req.headers['x-adams-notify-type']){
		case "debtStatus":
			
			break;
		default:
			res.sendStatus(201)
	}*/

})


module.exports = router;