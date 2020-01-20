// REQUIRES
const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

// ROUTES

//Gets all of the events ordered by date
// router.get('/',(req,res)=>{
//   let queryString = `
//     SELECT s.*, c.name AS country_name, r.name AS region_name FROM suppliers s
//     JOIN country c ON s.country_id = c.id
//     JOIN region r ON s.region_id = r.id
//     `;

//   pool.query(queryString).then(result=>{
//     res.send(result.rows);
//   }).catch(error=>{
//     console.log(error);
//     res.sendStatus(400);
//   })
// })

//Gets all of the events ordered by date
router.get('/',(req,res)=>{
  let queryString = `
    SELECT s.*, c.name AS country_name, r.name AS region_name FROM suppliers s
    JOIN country c ON s.country_id = c.id
    JOIN region r ON s.region_id = r.id
    
    `;
  let queryParams = [];

  if (req.query.search) {
    let prefix = (queryParams.length===0? 'WHERE ' : 'AND ');
    queryParams.push('%'+ req.query.search +'%');
    queryString += prefix + `LOWER(s.name) LIKE $${queryParams.length}`
  }

  if (req.query.country) {
    let prefix = (queryParams.length===0? 'WHERE ' : 'AND ');
    queryParams.push(req.query.country);
    queryString += prefix + `s.country_id=$${queryParams.length}`
  }

  if (req.query.region) {
    let prefix = (queryParams.length===0? 'WHERE ' : 'AND ');
    queryParams.push(req.query.region);
    queryString += prefix + `s.region_id=$${queryParams.length}`
  }

  pool.query(queryString, queryParams).then(result=>{
    res.send(result.rows);
  }).catch(error=>{
    console.log(error);
    res.sendStatus(400);
  })
})
/*
router.post('/',(req,res)=>{
  const {name,description,img,country,region,website} = req.body;
  let queryString = 'INSERT INTO suppliers (name, description, img_url, country_id, region_id, website_url) VALUES ($1,$2,$3,$4,$5,$6);';
  pool.query(queryString,[name,description,img,country,region,website]).then(result=>{   
    res.sendStatus(201);
  }).catch(error=>{
    console.log('Error posting supplier to database:',error);
    res.sendStatus(400);
  })
});

router.put('/edit',(req,res)=>{
  const {name,description,img,country,region,website,id} = req.body;
  let queryString = `
    UPDATE suppliers
    SET name=$1, description=$2, img_url=$3, country_id=$4, region_id=$5, website_url=$6
    WHERE id=$7;
  `;
  pool.query(queryString,[name,description,img,country,region,website,id]).then(result=>{   
    res.sendStatus(201);
  }).catch(error=>{
    console.log('Error posting supplier to database:',error);
    res.sendStatus(400);
  })
});

router.delete('/:id',(req,res)=>{
  let queryString = `
    DELETE FROM suppliers
    WHERE id=$1;
  `;
  pool.query(queryString,[req.params.id]).then(result=>{
    res.sendStatus(200);
  }).catch(error=>{
    console.log('Erorr deleting supplier from database:',error);
    res.sendStatus(400);
  })
})*/

// EXPORT THE ROUTES
module.exports = router;