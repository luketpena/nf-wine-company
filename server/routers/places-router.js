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
});

//Gets the name of a particular country
router.get('/country_details/:id',(req,res)=>{
  let queryString = 'SELECT * FROM country WHERE id=$1';
  pool.query(queryString,[req.params.id]).then(result=>{
    res.send(result.rows);
  }).catch(error=>{
    console.log(error);
    res.sendStatus(400);
  })
});

//Gets only favorited countries
router.get('/countries/favorite',(req,res)=>{
  let queryString = 'SELECT * FROM country WHERE favorite=true ORDER BY name ASC';
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
    SELECT r.*, COUNT(p.region_id) as producer_count FROM region r
    LEFT JOIN producers p ON r.id=p.region_id
    WHERE r.country_id=$1
    GROUP BY r.id
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

router.delete('/regions/:id', (req,res)=>{
  let queryString = `DELETE FROM region WHERE id=$1;`;
  
  pool.query(queryString, [req.params.id]).then(result=>{
    res.sendStatus(200);
  }).catch(error=>{
    console.log('Error deleting region from database:',error);
    res.sendStatus(400);
  })
})

router.put('/regions/:id', (req,res)=>{
  let queryString = `UPDATE region SET name=$2, region_code=$3 WHERE id=$1;`;

  pool.query(queryString, [req.params.id, req.body.name, req.body.region_code]).then(result=>{
    res.sendStatus(201);
  }).catch(error=>{
    console.log('Error updating region:',error);
    res.sendStatus(400);
  })
});

module.exports = router;