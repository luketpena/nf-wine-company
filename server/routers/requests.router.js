const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


//Gets all of the countries
router.get('/',(req,res)=>{
  let queryString = 'SELECT * FROM requests';
  pool.query(queryString).then(result=>{
    res.send(result.rows);
  }).catch(error=>{
    console.log(error);
    res.sendStatus(400);
  })
})

router.post('/',(req,res)=>{
  let queryString = `INSERT INTO requests (name, email, company) VALUES ($1,$2,$3);`;
  const {name, email, company} = req.body;
  pool.query(queryString,[name,email,company]).then(()=>{
    res.sendStatus(201);
  }).catch(error=>{
    console.log('Error posting new request to server:',error);
    res.sendStatus(400);    
  })
});

router.delete('/:id', rejectUnauthenticated, (req,res)=>{
  pool.query('DELETE FROM requests WHERE id=$1',[req.params.id]).then(()=>{
    res.sendStatus(200);
  }).catch(error=>{
    console.log('Error removing request:',error);
    res.sendStatus(400);
  });
});

module.exports = router;