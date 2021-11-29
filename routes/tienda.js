var express = require('express');
var router = express.Router();

var db = require("../db")

router.get('/', async (req, res) => {
  db.query("SELECT * from producto", [], (err, rs) => {
      res.render("tienda", {data: rs.rows});
  });
})
.post("/", async (req, res, next) =>{
    db.query("insert into producto(producto_id, producto_description, " +
    "producto_precio, product_img, existencia)" + 
    "values " +
    "((select coalesce(max(producto_id),0)+1 from producto), "+
    "$1, $2, $3, 4$) returning producto_id;",
    [
      req.body.producto_description,
      req.body.producto_precio,
      req.body.product_img,
      req.body.existencia
    ], (err, rs) => {
      if(err)
        res.sendStatus(500)
      res.json(rs.rows)
  });
})

module.exports = router;