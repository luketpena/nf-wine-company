// REQUIRES
const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

// ROUTES

router.get('/',(req,res)=>{

  let queryString = `
    SELECT p.*, c.name AS country_name, r.name AS region_name FROM producers p
    LEFT JOIN country c ON p.country_id = c.id
    LEFT JOIN region r ON p.region_id = r.id   
     `;
  let queryParams = [];


  if (req.query.search) {
    let prefix = (queryParams.length===0? 'WHERE ' : 'AND ');
    queryParams.push('%'+ req.query.search +'%');
    queryString += prefix + `p.name ILIKE $${queryParams.length}`
  }

  if (req.query.country) {
    let prefix = (queryParams.length===0? 'WHERE ' : 'AND ');
    queryParams.push(req.query.country);
    queryString += prefix + `p.country_id=$${queryParams.length}`
  }

  if (req.query.region) {
    let prefix = (queryParams.length===0? 'WHERE ' : 'AND ');
    queryParams.push(req.query.region);
    queryString += prefix + `p.region_id=$${queryParams.length}`
  }

  if (req.query.sort) {
    switch(req.query.sort) {
      case 'name': queryString += `ORDER BY p.name ASC`; break;
      case 'country': queryString += `ORDER BY country_name ASC`; break;
      case 'region': queryString += `ORDER BY region_name ASC`; break;
    }
  }


  pool.query(queryString, queryParams).then(result=>{
    res.send(result.rows);
  }).catch(error=>{
    console.log(error);
    res.sendStatus(400);
  })
})

router.post('/',(req,res)=>{
  const {name,description,img,country,region,subregion,website} = req.body;
  let queryString = 'INSERT INTO producers (name, description, img_url, country_id, region_id, subregion_id, website_url) VALUES ($1,$2,$3,$4,$5,$6,$7);';
  console.log('Posting new producer:',req.body);
  
  pool.query(queryString,[name,description,img,country,region,subregion,website]).then(result=>{   
    res.sendStatus(201);
  }).catch(error=>{
    console.log('Error posting supplier to database:',error);
    res.sendStatus(400);
  })
});

router.put('/edit',(req,res)=>{
  const {name,description,img,country,region,subregion,website,id} = req.body;
  let queryString = `
    UPDATE producers
    SET name=$1, description=$2, img_url=$3, country_id=$4, region_id=$5, subregion_id=$6, website_url=$7
    WHERE id=$8;
  `;
  pool.query(queryString,[name,description,img,country,region,subregion,website,id]).then(result=>{   
    res.sendStatus(201);
  }).catch(error=>{
    console.log('Error posting supplier to database:',error);
    res.sendStatus(400);
  })
});

router.delete('/:id',(req,res)=>{
  let queryString = `
    DELETE FROM producers
    WHERE id=$1;
  `;
  pool.query(queryString,[req.params.id]).then(result=>{
    res.sendStatus(200);
  }).catch(error=>{
    console.log('Erorr deleting supplier from database:',error);
    res.sendStatus(400);
  })
})

// EXPORT THE ROUTES
module.exports = router;