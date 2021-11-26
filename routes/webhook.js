var express = require('express');
var router = express.Router();

var md5 = require("md5");

//var axios = require("axios")
//var moment = require("moment")

const apiSecret = "0e5810e847bb12580b";

var db = require("../db")

router.post("/", (req, res, next)=>{
	console.log(JSON.stringify(req))
	/*var notify = req;

	switch (notify.type){
		case "debtStatus":
			HMAC_esperado = md5("adams" + req.body + apiSecret);
			HMAC_recibido = req.headers.HTTP_X_ADAMS_NOTIFY_HASH;
			if(HMAC_esperado == HMAC_recibido){
				res.sendStatus(200)
			} else {
				res.sendStatus(201)
			}
			break;
		default:
			res.sendStatus(201)
	}*/

	res.sendStatus(200)
})


module.exports = router;