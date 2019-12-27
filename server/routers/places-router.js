// REQUIRES
const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

// ROUTES

//Gets all of the countries
router.get('/countries',(req,res)=>{
  let queryString = 'SELECT * FROM country ORDER BY name ASC';
  pool.query(queryString).then(result=>{
    res.send(result.rows);
  }).catch(error=>{
    console.log(error);
    res.sendStatus(400);
  })
})

//Gets all of the regions of a country
router.get('/regions/:country',(req,res)=>{
  let queryString = `
    SELECT c.name, r.name FROM country c 
    JOIN region r on c.code=r.country
    WHERE c.name=$1
    ORDER BY r.name ASC;`
  pool.query(queryString, [req.params.country]).then(result=>{
    res.send(result.rows);
  }).catch(error=>{
    console.log('Error getting regions from database:',error);
    res.sendStatus(400);
  })
})


// EXPORT THE ROUTES
module.exports = router;