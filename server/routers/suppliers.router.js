// REQUIRES
const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

// ROUTES

router.get('/',(req,res)=>{
  let queryString = `SELECT * FROM suppliers ORDER BY UPPER("name") ASC`;
  let queryParams = [];

  if (req.query.search) {
    let prefix = 'WHERE ';
    queryParams.push('%'+ req.query.search +'%');
    queryString += prefix + `name ILIKE $${queryParams.length} `
  }
  if (req.query.sort) {
    switch(req.query.sort) {
      case 'name': queryString += `ORDER BY name ASC`; break;
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
  const {name,description,website} = req.body;
  let queryString = 'INSERT INTO suppliers (name, description, website_url) VALUES ($1,$2,$3);';
  pool.query(queryString,[name,description,website]).then(result=>{   
    res.sendStatus(201);
  }).catch(error=>{
    console.log('Error posting supplier to database:',error);
    res.sendStatus(400);
  })
});

router.post('/quickadd',(req,res)=>{
  const {name} = req.body;
  let queryString = 'INSERT INTO suppliers (name) VALUES ($1);';
  pool.query(queryString,[name]).then(result=>{   
    res.sendStatus(201);
  }).catch(error=>{
    console.log('Error quick adding supplier to database:',error);
    res.sendStatus(400);
  })
});

router.put('/edit',(req,res)=>{
  const {name,description,website,id} = req.body;
  let queryString = `
    UPDATE suppliers
    SET name=$1, description=$2, website_url=$3
    WHERE id=$5;
  `;
  console.log('Incoming edit:',req.body);
  
  pool.query(queryString,[name,description,website,id]).then(result=>{   
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