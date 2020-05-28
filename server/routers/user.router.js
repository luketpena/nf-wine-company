const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

router.get('/info', rejectUnauthenticated, (req,res)=> {
  if (req.user.access==='master' || req.user.access==='admin') {
    const queryString = `
      SELECT id, username, email, "access", "password_insecure" FROM "user"
      ORDER BY CASE 
        WHEN "access" = 'master' THEN '1'
        WHEN "access" = 'admin' THEN '2'
        ELSE "access" END;
    `
    pool.query(queryString).then(result=>{
      res.send(result.rows);
    }).catch(error=>{
      console.log('Error getting user information:',error);
      res.sendStatus(400);
    })
  }
})


router.get('/customers', rejectUnauthenticated, async (req,res)=> {
  try {
    
    const queryString = `
      SELECT id, username FROM "user" 
      WHERE "access" = 'customer';`;

    const result = await pool.query(queryString);
    res.send(result.rows);

  } catch(error) {
    console.log('Error retrieving customer accounts:', error);
    res.sendStatus(400);
  }
});

router.delete('/:id', rejectUnauthenticated, async (req,res)=> {
  if (req.user.access==='master' || req.user.access==='admin') {
    const client = await pool.connect();
    try {
      await client.query(`BEGIN`);
      let result = await client.query('SELECT "access" FROM "user" WHERE id=$1',[req.params.id]);    
      
      if (result.rows[0].access!=='master') {
        await client.query('DELETE FROM "user" WHERE id=$1',[req.params.id]);
        await client.query('COMMIT');
        res.sendStatus(200);
      } else {
        console.log('Cannot delete MASTER accounts.');
        res.sendStatus(403);
      }
    } catch (error) {
      client.query('ROLLBACK');
      console.log('Error deleting user:',error);
      res.sendStatus(400);
    } finally {
      client.release();
    }
  }
})

router.put('/update', rejectUnauthenticated, (req,res)=> {

  
  if (req.user.id === req.body.id) {
    pool.query('UPDATE "user" SET username=$1, email=$2 WHERE id=$3',[req.body.username, req.body.email, req.user.id]).then(()=>{
      res.sendStatus(200);
    }).catch(error=>{
      console.log('Error updating user password:',error);
      res.sendStatus(400);
    });
  } else {
    res.sendStatus(403);
  }
});

router.put('/password', rejectUnauthenticated, (req,res)=> {
  const password = encryptLib.encryptPassword(req.body.password);
  if (req.user.id === req.body.id) {
    pool.query('UPDATE "user" SET password=$1 WHERE id=$2',[password, req.user.id]).then(()=>{
      res.sendStatus(200);
    }).catch(error=>{
      console.log('Error updating user information:',error);
      res.sendStatus(400);
    });
  } else {
    res.sendStatus(403);
  }
});

router.put('/password/customer', rejectUnauthenticated, async (req,res)=> {
  const password = encryptLib.encryptPassword(req.body.password);
  const passwordInsecure = req.body.password;
  if (req.user.access==='master' || req.user.access==='admin') {
      
    
      await pool.query('UPDATE "user" SET password=$2, password_insecure=$3 WHERE id=$1',[req.body.id, password, passwordInsecure]).then(()=>{
      console.log('MODIFYING ACCOUNT',passwordInsecure);
      res.sendStatus(200);
    }).catch(error=>{
      console.log('Error updating user information:',error);
      res.sendStatus(400);
    });
  } else {
    res.sendStatus(403);
  }
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', async (req, res) => {  
  const {username, email, access} = req.body;
  const password = encryptLib.encryptPassword(req.body.password);
  const password_insecure = (access==='customer'? req.body.password : undefined);

  const client = await pool.connect();
  try {
    await client.query(`BEGIN`);
    const queryText = 'INSERT INTO "user" (username, password, password_insecure, email, access) VALUES ($1, $2, $3, $4, $5) RETURNING id';
    await pool.query(queryText, [username, password, password_insecure, email, access]);

    await client.query('COMMIT');
    res.sendStatus(201);
    
  } catch (error) {
    client.query('ROLLBACK');
    console.log('Error registering user:',error);
    res.send('Had an error:'+error);
  } finally {
    client.release();
  }
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
