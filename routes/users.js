var express = require('express');
var router = express.Router();
const { Pool } = require('pg');
const bodyParser = require('body-parser');


const pool = new Pool({
    user: 'root',
    host: 'localhost',
    database: 'net_eng',
    password: '1qaz',
    port: 5432,
});

router.post('/', async (req, res, next)=>{
  try{
      const { username, email, password } = req.body;
      const result = await pool.query("INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *", [username    , email, password]);
      res.json(result.rows[0]);
  }
  catch (e){
      res.status(500);
      res.json({"error": e})
  }
})

router.put('/', async (req, res) => {
  try{
      const { id, username, email } = req.body;
      const result = await pool.query("update users set username = $1, email = $2 where id = $3", [username, email, id]);
      res.json(result.rows[0]);
  }
  catch (e){
      res.status(500);
      res.json({"error": e})
  }
})


router.get('/:id', async (req, res)=>{
  try{
      const {id} = req.params;
      const result = await pool.query("select * from users where id = $1", [id]);
      res.json(result.rows);
  }
  catch (e){
      res.status(500);
      res.json({"error": e})
  }
})

router.get('/', async (req, res) => {
    try {
        const {offset, limit} = req.query;
        const result = await pool.query("select * from users offset $1 limit $2;", [offset, limit]);
        res.json(result.rows);
    }catch (e){
      res.status(500);
      res.json({"error": e})
    }
})

module.exports = router;
