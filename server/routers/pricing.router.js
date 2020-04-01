const express = require('express');
const router = express.Router();
const path = require('path');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

router.get('/download', rejectUnauthenticated, (req,res)=>{
  res.sendFile(path.join(__dirname + '/../files/pricing.pdf'));
});

module.exports = router;