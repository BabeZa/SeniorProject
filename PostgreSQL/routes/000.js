const express = require("express");
const router = express.Router();
const pool = require("../db");
const authJwt = require("../middleware/authJwt");

router.post("/create", async (req, res) =>{
  try {
      const {  } = req.body;
      const newo = await pool.query(
        "",
        []
      );
      res.json(newo.rows[0]);
  } catch (error) {
      console.error(err.message);
  }
});

router.get("/all", async (req, res) => {
  try {
    const all = await pool.query("SELECT * FROM .....");
    res.json(all.rows);
  } catch (err) {
    console.error(err.message);
  }
});


router.get("/get/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const get = await pool.query("SELECT * FROM ......... WHERE id = $1", [id]);

    res.json(get.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {  } = req.body;
    const update = await pool.query(
      "",
      [id, ]
    );
    res.json("....... was updated!");
  } catch (err) {
    console.error(err.message);
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletesubject = await pool.query("DELETE FROM ....... WHERE id = $1", 
      [id]
    );
    res.json("subject was deleted!");
  } catch (err) {
    console.log(err.message);
  }
});


module.exports = router;













