var express = require('express');
var path = require('path');
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res) {
  console.log(req.session.user);
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// router.get('/:name', function(req, res){
//   console.log(req.cookies['user']);
//   res.sendFile(path.join(__dirname, '../public/index.html'));
// })

module.exports = router;
