var express = require('express');
var router = express.Router();
const path = require("path")

router.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname, '../public/html/admin.html'));   
  }).get('/home', function(req, res, next) {
    res.render("index", {title: "CUENTAPP"});
  })


module.exports = router;