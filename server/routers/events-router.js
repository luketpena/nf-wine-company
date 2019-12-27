// REQUIRES
const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

// ROUTES

//Gets all of the events ordered by date
router.get('/',(req,res)=>{
  let queryString = 'SELECT * FROM events ORDER BY date, time ASC';
  pool.query(queryString).then(result=>{
    res.send(result.rows);
  }).catch(error=>{
    console.log('Error getting events from the database:',error);
    res.sendStatus(400);
  })
})

//Add a new event to the DB
router.post('/',(req,res)=>{
  const {name,description,img,date,time,price} = req.body;
  
  let queryString = 'INSERT INTO events (name, description, img, date, time, price) VALUES ($1,$2,$3,$4,$5,$6);';
  pool.query(queryString,[name,description,img,date,time,price]).then(result=>{
    res.sendStatus(201);
  }).catch(error=>{
    console.log('Error adding event to database:',error);
    res.sendStatus(400);
  })
})

//Remove an event from the DB
router.delete('/:id',(req,res)=>{
  const id = req.params.id;

  let queryString = 'DELETE FROM events WHERE id=$1;';
  pool.query(queryString,[id]).then(result=>{
    res.sendStatus(200);
  }).catch(error=>{
    console.log('Error deleting event from database:',error);
    res.sendStatus(400);
  });
});

// EXPORT THE ROUTES
module.exports = router;