// REQUIRES
const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

// ROUTES

router.get('/',(req,res)=>{

  let queryString = `
    SELECT p.*, c.name AS country_name, r.name AS region_name, s.name AS subregion_name FROM producers p
    LEFT JOIN country c ON p.country_id = c.id
    LEFT JOIN region r ON p.region_id = r.id   
    LEFT JOIN subregion s on p.subregion_id = s.id
     `;
  let queryParams = [];

  //>> Add search parameters as they come in
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

  if (req.query.subregion) {
    let prefix = (queryParams.length===0? 'WHERE ' : 'AND ');
    queryParams.push(req.query.subregion);
    queryString += prefix + `p.subregion_id=$${queryParams.length}`
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

//Creates a new producer with all information
router.post('/',(req,res)=>{
  const {name,description,country,region,subregion,website} = req.body;
  let queryString = 'INSERT INTO producers (name, description, country_id, region_id, subregion_id, website_url) VALUES ($1,$2,$3,$4,$5,$6);';
  console.log('Posting new producer:',req.body);
  
  pool.query(queryString,[name,description,country,region,subregion,website]).then(result=>{   
    res.sendStatus(201);
  }).catch(error=>{
    console.log('Error posting producer to database:',error);
    res.sendStatus(400);
  })
});

//Creates a new producer with only basic information
router.post('/quickadd', async (req,res)=>{
  const {name, country, region, subregion} = req.body;
  const queryString = `INSERT INTO producers (name, country_id, region_id, subregion_id) VALUES ($1,$2,$3,$4)`;

  try {
    await pool.query(queryString, [name, country, region, subregion]);
    res.sendStatus(201);
  } catch {
    console.log('Error quickAdding producer to database:',error);
    res.sendStatus(400);
  }
});

router.put('/edit',(req,res)=>{
  const {name,description,country,region,subregion,website,id} = req.body;
  let queryString = `
    UPDATE producers
    SET name=$1, description=$2, country_id=$3, region_id=$4, subregion_id=$5, website_url=$6
    WHERE id=$7;
  `;
  pool.query(queryString,[name,description,country,region,subregion,website,id]).then(result=>{   
    res.sendStatus(201);
  }).catch(error=>{
    console.log('Error posting supplier to database:',error);
    res.sendStatus(400);
  })
});

router.delete('/:id',(req,res)=>{
  let queryString = `DELETE FROM producers WHERE id=$1;`;
  pool.query(queryString,[req.params.id]).then(result=>{
   
    res.sendStatus(200);
  }).catch(error=>{
    console.log('Erorr deleting supplier from database:',error);
    res.sendStatus(400);
  })
})

// EXPORT THE ROUTES
module.exports = router;