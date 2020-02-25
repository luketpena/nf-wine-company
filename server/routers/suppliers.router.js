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
  const {name,description,img,website} = req.body;
  let queryString = 'INSERT INTO suppliers (name, description, img_url, website_url) VALUES ($1,$2,$3,$4);';
  pool.query(queryString,[name,description,img,website]).then(result=>{   
    res.sendStatus(201);
  }).catch(error=>{
    console.log('Error posting supplier to database:',error);
    res.sendStatus(400);
  })
});

router.put('/edit',(req,res)=>{
  const {name,description,img,website,id} = req.body;
  let queryString = `
    UPDATE suppliers
    SET name=$1, description=$2, img_url=$3, website_url=$4
    WHERE id=$5;
  `;
  console.log('Incoming edit:',req.body);
  
  pool.query(queryString,[name,description,img,website,id]).then(result=>{   
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