var express = require('express');
var router = express.Router();

var axios = require("axios")
var moment = require("moment")



const siExiste = "update"
const apiKey = "adams-14331675fbc0b2"
const host = "https://staging.adamspay.com"
const path = "/api/v1/debts"


router.get('/', async (req, res) => {
    db.query("SELECT * from pagos", [], (err, rs) => {
        res.json(rs.rows);
    });
})
.get("/plan-:id", (req, res, next)=>{
    db.query("select * from producto where producto_id = $1", [
        req.params.id
    ], (err, result)=>{
        if(err)
            res.sendStatus(500)
        res.render("tienda/checkout", result.rows[0])
    })
})
.post("/", async (req, res, next) => {
    const { Pool } = require('pg')
    const pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false}
    });(async () => {
            // note: we don't try/catch this because if connecting throws an exception
            // we don't need to dispose of the client (it will be undefined)
            const client = await pool.connect()
            try {
                await client.query('BEGIN')
                const queryVenta = "insert into venta(venta_id, cliente_id, venta_precio_total, " +
                    "venta_fecha_hora, venta_cobro, venta_estado, venta_cobro_estado, " +
                    "venta_cobrada_fechahora) " +
                    "values " +
                    "((select coalesce(max(venta_id), 0) + 1 from venta), " +
                    "$1, $2, current_timestamp, 0, 'active', 'pending', current_timestamp) returning venta_id";

                const result = await client.query(queryVenta, [req.body.cliente_id, req.body.venta_precio_total])

                const queryDetalle = 'insert into ctrl_productos(venta_id, producto_id, cantidad) VALUES ($1, $2, $3);'

                var detalle = JSON.parse(req.body.detalle);

                for (let i = 0; i < detalle.length; i++) {
                    await client.query(queryDetalle, [result.rows[0].venta_id, detalle[i].producto_id, detalle[i].cantidad])
                }
                
                //crear deuda en ADAMSPAY
                deuda = {
                    "docId": result.rows[0].venta_id,
                    "amount":
                    {
                        "currency": "PYG",
                        "value": req.body.venta_precio_total
                    },
                    "label": "Pedido: " + result.rows[0].venta_id,
                    "validPeriod": {
                        "start": moment().utc().format(),
                        "end": moment().add(2, "days").utc().format()
                    }
                }
                //crear deuda en AdamsPay
                await axios({
                    method: 'POST',
                    baseURL: host,
                    url: path,
                    headers: {
                        "apikey": apiKey,
                        "Content-Type": "application/json",
                        "x-if-exists": siExiste
                    },
                    data: { "debt": deuda }
                }).then((axiosResponse) => {
                    //console.log(response.data)
                    var urlPago = axiosResponse.data.debt.payUrl || ""
                    if (urlPago != "") {
                        res.json({message: "deuda creada", urlPago})
                    } else {
                        res.sendStatus(201)
                    }
                }).catch(function (error) {
                    console.log(error);
                    res.sendStatus(201)
                  });

                await client.query('COMMIT') //comit en la bd
            } catch (e) {
                await client.query('ROLLBACK')
                res.json({error: true, message: e.message})
                throw e
            } finally {
                client.release()
            }
        })().catch(e =>{
            console.error(e.message)
        })
});
module.exports = router;