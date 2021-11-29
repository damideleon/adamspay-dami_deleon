var express = require('express');
var router = express.Router();

var md5 = require("md5");

//var axios = require("axios")
//var moment = require("moment")

const apiSecret = "0e5810e847bb12580b";

var db = require("../db")

router.post("/", (req, res, next) => {
	//COMPROBAR HASH
	HMAC_esperado = md5("adams" + req.rawBody + apiSecret);
	HMAC_recibido = req.headers['x-adams-notify-hash'];
	if (HMAC_esperado == HMAC_recibido) {
		console.log("OK hash")
		var notify = req.body.notify.type;
		switch (notify) {
			case "debtStatus":
				//console.log(req.body)
				db.query(
					"update venta set venta_cobro_estado = $1, " +
					"venta_estado = $2, venta_cobro=$3 where " +
					"venta_id = $4 returning venta_id;",
					[
						req.body.debt.payStatus.status, //estado del pago
						req.body.debt.objStatus.status, // estado de la deuda
						req.body.debt.amount.paid, //monto pagado
						req.body.debt.docId // identificador
					], (err, rs) => {
						if (err) {
							console.error(err.message)
							res.sendStatus(201)
						} else {
							if (rs.rows.length > 0) {
								res.sendStatus(200)
							}
						}
					}
				);
				break;
			default:
				res.sendStatus(201)
		}
	} else {
		res.sendStatus(201)
	}
})


module.exports = router;