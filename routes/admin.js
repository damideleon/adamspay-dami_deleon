var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) =>{
    //response.json({info:'aplicación web funcionando'})
    res.json({cool: true})
})


module.exports = router;