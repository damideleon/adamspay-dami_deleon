var express = require('express');
var router = express.Router();

var md5 = require("md5");

//var axios = require("axios")
//var moment = require("moment")

const apiSecret = "0e5810e847bb12580b";

var db = require("../db")

router.post("/", (req, res, next)=>{	
	HMAC_esperado = md5("adams" + req.body + apiSecret);
	HMAC_recibido = req.headers['x-adams-notify-hash'];
	if(HMAC_esperado == HMAC_recibido){
		console.log("OK hash")
	} else {
		es.sendStatus('No ok Hash: ' + HMAC_esperado +' >><< ' + HMAC_recibido )
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