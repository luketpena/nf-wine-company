// REQUIRES
const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

// ROUTES

router.get('/',(req,res)=>{
  let queryString = `SELECT * FROM suppliers `;
  let queryParams = [];

  if (req.query.search) {
    let prefix = 'WHERE ';
    queryParams.push('%'+ req.query.search +'%');
    queryString += prefix + `unaccent(name) ILIKE unaccent($${queryParams.length}) `
  }
  if (req.query.sort) {
    switch(req.query.sort) {
      case 'name': queryString += `ORDER BY name ASC`; break;
      case 'type': queryString += `ORDER BY direct ASC;`; break;
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
  const {name,description,website,direct} = req.body;
  let queryString = 'INSERT INTO suppliers (name, description, website_url, direct) VALUES ($1,$2,$3,$4);';
  pool.query(queryString,[name,description,website,direct]).then(result=>{   
    res.sendStatus(201);
  }).catch(error=>{
    console.log('Error posting supplier to database:',error);
    res.sendStatus(400);
  })
});

router.post('/quickadd',(req,res)=>{
  const {name,direct} = req.body;
  let queryString = 'INSERT INTO suppliers (name,direct) VALUES ($1,$2);';
  pool.query(queryString,[name,direct]).then(result=>{   
    res.sendStatus(201);
  }).catch(error=>{
    console.log('Error quick adding supplier to database:',error);
    res.sendStatus(400);
  })
});

router.put('/edit',(req,res)=>{
  const {name,description,website,direct,id} = req.body;
  let queryString = `
    UPDATE suppliers
    SET name=$1, description=$2, website_url=$3, direct=$4
    WHERE id=$5;
  `;
  console.log('Incoming edit:',req.body);
  
  pool.query(queryString,[name,description,website,direct,id]).then(result=>{   
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
})

// EXPORT THE ROUTES
module.exports = router;