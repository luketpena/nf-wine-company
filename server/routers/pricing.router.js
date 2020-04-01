const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');
const path = require('path');

router.get('/download', (req,res)=>{
  res.sendFile(path.join(__dirname + '/../files/pricing.pdf'));
});

module.exports = router;