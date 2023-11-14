const express = require("express");
const router = express.Router();
const pool = require("../db");

router.post("/create", async (req, res) =>{
  try {
      const { fname, lname, age  } = req.body;
      const newtest = await pool.query(
          "INSERT INTO test ( fname, lname, age ) VALUES ($1, $2, $3) RETURNING *",
        [ fname, lname, age ]
      );
      res.json(newtest.rows[0]);
  } catch (error) {
      console.error(err.message);
  }
});

router.post("/sscreate", async (req, res) =>{

    console.log("[test.js] ssc body", req.body.length);

    // req.body.map((i)=> ([i.fname, i.lname, i.age]));
    // pool.query(
    //   'INSERT INTO test( fname, lname, age ) VALUES ?',
    //   [req.body.map(i => [i.fname, i.lname, i.age])]
    // );

    for (var i = 0; i < req.body.length; i++) {
      pool.query('INSERT INTO test( fname, lname, age ) VALUES ($1, $2, $3) RETURNING *', [req.body[i].fname, req.body[i].lname, req.body[i].age], 
      (error, results) => {
        if (error) {
          console.error(error.message);
        } else {
          console.log("Rows " + JSON.stringify(results.rows));
        }
     });
    }

  //   await pool.none(
  //     'INSERT INTO test( fname, lname, age ) VALUES $1', 
  //     Inserts(' ${fname}, ${lname}, ${age}', data))
  //   .then(data=> {
  //     console.log("[test.js] ssc result", data.rows[0]);
  //     res.json(data.rows[0]);
  //   })
  //   .catch(error=> {
  //     console.error(error.message);
  //   });


});

router.get("/", async (req, res) => {
  try {
    const alltest = await pool.query("SELECT * FROM subject");
    res.json(allsubject.rows);
  } catch (err) {
    console.error(err.message);
  }
});



module.exports = router;













