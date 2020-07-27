// REQUIRES
const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// ROUTES

//Get all events, trade and public
router.get('/', rejectUnauthenticated,(req,res)=>{
  let queryString = 'SELECT * FROM events ORDER BY date, time ASC';
  pool.query(queryString).then(result=>{
    res.send(result.rows);
  }).catch(error=>{
    console.log('Error getting events from the database:',error);
    res.sendStatus(400);
  });
});

//Get only trade events
router.get('/trade', rejectUnauthenticated,(req,res)=>{
  let queryString = 'SELECT * FROM events WHERE trade=true ORDER BY date, time ASC';
  pool.query(queryString).then(result=>{
    res.send(result.rows);
  }).catch(error=>{
    console.log('Error getting events from the database:',error);
    res.sendStatus(400);
  });
});

//Get only trade events
router.get('/public', (req,res)=>{
  let queryString = 'SELECT * FROM events WHERE trade=false ORDER BY date, time ASC';
  pool.query(queryString).then(result=>{
    res.send(result.rows);
  }).catch(error=>{
    console.log('Error getting events from the database:',error);
    res.sendStatus(400);
  });
});

//Add a new event to the DB
router.post('/',(req,res)=>{
  const {name,description,date,time,price,link_url,link_text,trade} = req.body;
  const queryParams = [name,description,date,(time? time : null),(price? price : null),link_url,link_text,trade];

  console.log('Incoming event:',req.body);
  
  
  let queryString = 'INSERT INTO events (name, description, date, time, price, link_url, link_text, trade) VALUES ($1,$2,$3,$4,$5,$6,$7,$8);';
  pool.query(queryString,queryParams).then(result=>{
    res.sendStatus(201);
  }).catch(error=>{
    console.log('Error adding event to database:',error);
    res.sendStatus(400);
  })
})

//Modify an existing event
router.put('/edit',(req,res)=>{
  const {id,name,description,date,time,price,link_url,link_text,trade} = req.body;
  const queryParams = [id,name,description,date,(time? time : null),(price? price : null),link_url,link_text,trade];
  
  let queryString = `
    UPDATE events 
    SET name=$2, description=$3, date=$4, time=$5, price=$6, link_url=$7, link_text=$8, trade=$9
    WHERE id=$1;`;
  
    pool.query(queryString,queryParams).then(result=>{
      res.sendStatus(200);
    }).catch(error=>{
      console.log('Error editing the event on the database:',error);
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

module.exports = router;