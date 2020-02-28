const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

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
    SELECT * FROM region r
    WHERE r.country_id=$1
    ORDER BY LOWER(r.name) ASC;`
  pool.query(queryString, [req.params.country]).then(result=>{
    res.send(result.rows);
  }).catch(error=>{
    console.log('Error getting regions from database:',error);
    res.sendStatus(400);
  })
})

router.post('/regions', (req,res)=>{
  let queryString = `INSERT INTO region (country_id, name, region_code) VALUES ($1,$2,$3);`;
  let queryParams = [req.body.country_id,req.body.name,req.body.region_code];
  
  pool.query(queryString,queryParams).then(result=>{
    res.sendStatus(201);
  }).catch(error=>{
    console.log('Error posting new region:',error);
    res.sendStatus(400);
  })
});

module.exports = router;