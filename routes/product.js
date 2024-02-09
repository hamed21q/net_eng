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
      const { name, price, description, title } = req.body;
      const result = await pool.query("INSERT INTO products (name, price, description, title) VALUES ($1, $2, $3, $4) RETURNING *", [name, price, description, title]);
      res.json(result.rows[0]);
  }
  catch (e){
      res.status(500);
      res.json({"error": e})
  }
})

router.put('/', async (req, res) => {
  try{
      const { id, name, price, description, title } = req.body;
      const result = await pool.query("update products set name = $1, price = $2, description = $3, title = $4 where id = $5", [name, price, description, title, id]);
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
      const result = await pool.query("select * from products where id = $1", [id]);
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
        const result = await pool.query("select * from products  offset $1 limit $2;", [offset, limit]);
        res.json(result.rows);
    }catch (e){
      res.status(500);
      res.json({"error": e})
    }
})

module.exports = router;
