// REQUIRES
const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

// ROUTES

//Gets all of the events ordered by date
router.get('/',(req,res)=>{
  let queryString = `
    SELECT s.*, c.name AS country_name, r.name AS region_name FROM suppliers s
    JOIN country c ON s.country_id = c.id
    JOIN region r ON s.region_id = r.id
    ORDER BY s.id;`;
  pool.query(queryString).then(result=>{
    res.send(result.rows);
  }).catch(error=>{
    console.log(error);
    res.sendStatus(400);
  })
})
/*
router.post('/',(req,res)=>{
  const {name,description,img,country,region,website} = req.body;
  let queryString = 'INSERT INTO producers (name, description, img, country, region, website) VALUES ($1,$2,$3,$4,$5,$6);';
  pool.query(queryString,[name,description,img,country,region,website]).then(result=>{
    res.sendStatus(201);
  }).catch(error=>{
    console.log(error);
    res.sendStatus(400);
  })
})*/

// EXPORT THE ROUTES
module.exports = router;