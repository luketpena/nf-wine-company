const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

//Gets all of the countries
router.get('/countries',(req,res)=>{
  let queryString = 'SELECT * FROM country ORDER BY name ASC';
  pool.query(queryString).then(result=>{
    res.send(result.rows);
  }).catch(error=>{
    console.log(error);
    res.sendStatus(400);
  })
});

//Gets the name of a particular country
router.get('/country_details/:id',(req,res)=>{
  let queryString = 'SELECT * FROM country WHERE id=$1';
  pool.query(queryString,[req.params.id]).then(result=>{
    res.send(result.rows);
  }).catch(error=>{
    console.log(error);
    res.sendStatus(400);
  })
});

//Gets only favorited countries
router.get('/countries/favorite',(req,res)=>{
  let queryString = 'SELECT * FROM country WHERE favorite=true ORDER BY name ASC';
  pool.query(queryString).then(result=>{
    res.send(result.rows);
  }).catch(error=>{
    console.log(error);
    res.sendStatus(400);
  })
})

router.put('/countries/favorite/:id',(req,res)=>{
  let queryString = `UPDATE country SET favorite=$2 WHERE id=$1`;
  pool.query(queryString, [req.params.id, req.body.value]).then(result=>{
    res.sendStatus(200);
  }).catch(error=>{
    console.log('Error updating country favorite status:',error);    
  });
});

//Gets all of the regions of a country
router.get('/regions/:country', async (req,res)=>{
  let queryString = `
    SELECT r.*, COUNT(p.region_id) as producer_count FROM region r
    LEFT JOIN producers p ON r.id=p.region_id
    WHERE r.country_id=$1
    GROUP BY r.id
    ORDER BY LOWER(r.name) ASC;`;
  let subregionQuery = `
    SELECT COUNT(s.region_id) as subregion_count FROM region r
    LEFT JOIN subregion s ON s.region_id=r.id
    WHERE r.country_id=$1
    GROUP BY r.id
    ORDER BY LOWER(r.name) ASC;`;

  try {
    let result = await pool.query(queryString, [req.params.country]);
    let subregion_count = await pool.query(subregionQuery, [req.params.country]);

    for (let i=0; i<result.rows.length; i++) {
      result.rows[i].subregion_count = subregion_count.rows[i].subregion_count;
    }
    
    res.send(result.rows);
  } catch(error) {
    console.log('Error getting regions from database:',error);
    res.sendStatus(400);
  }
})

router.post('/regions', (req,res)=>{
  let queryString = `INSERT INTO region (name, country_id) VALUES ($1,$2);`;
  let queryParams = [req.body.name,req.body.country_id];
  
  pool.query(queryString,queryParams).then(result=>{
    res.sendStatus(201);
  }).catch(error=>{
    console.log('Error posting new region:',error);
    res.sendStatus(400);
  })
});

router.post('/subregions', (req,res)=>{
  let queryString = `INSERT INTO subregion (region_id, name) VALUES ($1,$2);`;
  let queryParams = [req.body.region_id, req.body.name];
  
  pool.query(queryString,queryParams).then(()=>{
    res.sendStatus(201);
  }).catch(error=>{
    console.log('Error posting new subregion:',error);
    res.sendStatus(400);
  })
});

router.delete('/regions/:id', async (req,res)=>{
  try {
    //>> Select and set all references to region to null
    await pool.query(`UPDATE producers SET region_id=NULL WHERE region_id=$1`,[req.params.id]);
    //>> Delete the region after removing references
    await pool.query(`DELETE FROM region WHERE id=$1;`, [req.params.id]);
    res.sendStatus(200);
  } catch(error) {
    console.log('Error deleting region from database:',error);
    res.sendStatus(400);
  }
})

router.put('/regions/:id', (req,res)=>{
  let queryString = `UPDATE region SET name=$2 WHERE id=$1;`;

  pool.query(queryString, [req.params.id, req.body.name]).then(result=>{
    res.sendStatus(201);
  }).catch(error=>{
    console.log('Error updating region:',error);
    res.sendStatus(400);
  })
});

router.get('/subregions/:id', (req,res)=>{
  let queryString = `
    SELECT s.*, COUNT(p.subregion_id) AS producer_count FROM subregion s
    LEFT JOIN producers p ON p.subregion_id=s.id
    WHERE s.region_id=$1 
    GROUP BY s.id
    ORDER BY s.name ASC`;
  pool.query(queryString, [req.params.id]).then(result=>{
    res.send(result.rows);
  }).catch(error=>{
    console.log('Error getting subregions from database:',error);
    res.sendStatus(400);
  })
});

router.delete('/subregions/:id', async (req,res)=>{
  let queryString = `DELETE FROM subregion WHERE id=$1;`;
  
  try {
    //>> Select and set all references to subregion to null
    await pool.query(`UPDATE producers SET subregion_id=NULL WHERE subregion_id=$1`,[req.params.id]);
    //>> Delete the subregion after removing references
    await pool.query(queryString, [req.params.id]);
    res.sendStatus(200);
  } catch(error) {
    console.log('Error deleting region from database:',error);
    res.sendStatus(400);
  }
})

module.exports = router;