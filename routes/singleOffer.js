const express = require('express');
const router = express.Router();
const db = require('../db');


router.get('/graduates/:graduate_id/offers/:id', async (req, res, next)=> {
  const offerQuery = {
    text: 'SELECT title FROM offers WHERE graduate_id=$1 AND id =$2',
    values: [req.params.graduate_id, req.params.id]
  }

  try {
    const result = await db.query(offerQuery);

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

router.patch('/graduates/:graduate_id/offers/:id', async (req, res, next)=> {
  const offerQuery = {
    text: 'UPDATE offers SET title=$1 WHERE graduate_id=$2 AND id=$3 RETURNING *',
    values: [req.body.title, req.params.graduate_id, req.params.id]
  }
  
  try {
    const result = await db.query(offerQuery);
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

router.delete('/graduates/:graduate_id/offers/:id', async (req, res, next)=> {
  const offerQuery = {
    text: 'DELETE FROM offers WHERE graduate_id=$1 AND id=$2 RETURNING *',
    values: [req.params.graduate_id, req.params.id]
  }

  try {
    const result = await db.query(offerQuery);
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});


module.exports=router;