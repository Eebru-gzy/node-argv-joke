const express = require('express');
const router = express.Router();
const db = require('../db');


router.get('/graduates/:id/offers', async (req, res, next)=> {
  const gradQuery = {
    text: 'SELECT * FROM graduates WHERE id=$1',
    values: [req.params.id]
  }
  const offerQuery = {
    text: 'SELECT title FROM offers WHERE graduate_id=$1',
    values: [req.params.id]
  }

  try {
    const result = await db.query(gradQuery);
    const result2 = await db.query(offerQuery);

    result.rows[0].offers = result2.rows;
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
})

router.post('/graduates/:id/offers', async (req, res, next)=> {
  const Q = {
    text: 'INSERT INTO offers (title, graduate_id) VALUES ($1, $2) RETURNING *',
    values: [req.body.title, req.params.id]
  }

  try {
    const result = await db.query(Q);

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
})


module.exports = router;