var express = require('express');
var tempDB = require('./TEMP_schema');
var router = express.Router();
var helper = require('./helper_methods');

router.get('*', function(req, res, next) {

  next();
});


/* GET ABOUT PAGE. */
router.get('', function(req, res, next) {
  var navbar = {
    active: 'about',
    links: [{}]
  };



  res.render('about', { title: 'CS Club', navbar: navbar });
});

module.exports = router;
