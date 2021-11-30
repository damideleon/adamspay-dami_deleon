var express = require('express');
var router = express.Router();
const path = require("path");

const db = require("../db")

router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public/html/admin.html'));   
}).get('/home', function(req, res, next) {
  res.render("index", {title: "CUENTAPP"});
})
.get('/gratzie', function(req, res, next) {

  data = {
    cliente : {},
    producto : {}
  }
  db.query("select v.*, cli.cliente_nombre from " +
  "venta v join cliente cli on v.cliente_id = cli.cliente_id " +
  "where v.venta_id = $1;", [req.body.doc_id], (e, result)=>{
    if(e){
      console.error(e.message)
    }
    data.cliente = result.rows[0]
  })

  db.query("SELECT *, (c.cantidad * p.producto_precio) as total " + 
  "from ctrl_productos c JOIN producto p ON c.producto_id = p.producto_id  " +
  "where c.venta_id = $1;", [req.body.doc_id], (e, result)=>{
    if(e){
      console.error(e.message)
    }
    data.producto = result.rows[0]
  })
    res.render("congrats", data);
})


module.exports = router;