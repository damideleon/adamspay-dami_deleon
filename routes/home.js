var express = require('express');
var router = express.Router();

router.get('/', (req, res) =>{
    //response.json({info:'aplicación web funcionando'})
    res.render('index');
})


module.exports = router;