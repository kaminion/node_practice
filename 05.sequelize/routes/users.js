var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');

  try{

  }catch(err)
  {
    err.status = 500;
    next(err);
  }

});

module.exports = router;
