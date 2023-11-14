const express = require("express");
const router = express.Router();
const pool = require("../db");
const fs = require('fs');
const authJwt = require("../middleware/authJwt");


// router.post("/create", async (req, res) =>{
//   try {
//       const { name, path, mimetype, thumbnail } = req.body;
//       const newphoto = await pool.query(
//           "INSERT INTO photo (name, path, mimetype,  thumbnail ) VALUES ($1, $2, $3, $4) RETURNING id",
//         [name, path, mimetype,  thumbnail]
//       );
//       res.json(newphoto.rows[0]);
//   } catch (error) {
//       console.error(err.message);
//   }
// });

router.post("/supercreate", async (req, res) =>{
  try {
      const { filename, path, mimetype, thumbnail } = req.body;

      const newphoto = await pool.query(
          "INSERT INTO photo (name, path, mimetype,  thumbnail ) VALUES ($1, $2, $3, $4) RETURNING id",
        ["img-"+filename, __pathphoto+"img-"+filename, mimetype, thumbnail]
      );

      const newthumbnail = await pool.query(
          "INSERT INTO photo (name, path, mimetype, thumbnail ) VALUES ($1, $2, $3, $4) RETURNING id",
        ["thumbnail-"+filename, __pathphoto+"thumbnail-"+filename, mimetype, thumbnail]
      );

      const updatephoto = await pool.query(
        "UPDATE photo SET name = $2, path = $3, mimetype = $4, thumbnail = $5 WHERE id = $1",
        [newphoto.rows[0].id, "img-"+filename, __pathphoto+"img-"+filename, mimetype, newthumbnail.rows[0].id]
      );


      res.json(newphoto.rows[0]);
  } catch (err) {
      console.error(err.message);
  }
});

router.get("/getphoto", authJwt.verifyToken, async (req, res) => {
  try {
    const employee = await pool.query(
      'SELECT ph.path as img, th.path as thumb '+
      'FROM users u '+
      'JOIN photo ph ON ph.id = u.photo_id '+
      'JOIN photo th ON th.id = ph.thumbnail '+
      'WHERE u.id = $1 ',
      [req.user.id]
    );

    res.json(employee.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});


//get all photo

router.get("/all", async (req, res) => {
  try {
    const allphoto = await pool.query("SELECT * FROM photo");
    res.json(allphoto.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get a photo

router.get("/get/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const photo = await pool.query("SELECT * FROM photo WHERE id = $1", [
      id
    ]);

    res.json(photo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//update a photo

router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, path, mimetype, thumbnail } = req.body;
    const updatephoto = await pool.query(
      "UPDATE photo SET name = $2, path = $3, mimetype = $4, thumbnail = $ WHERE id = $1",
      [id, name, path, mimetype, thumbnail]
    );

    res.json("photo was updated!");
  } catch (err) {
    console.error(err.message);
  }
});

//delete a photo

router.delete("/superdelete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // const {  path  } = req.body;

    const photo = await pool.query("SELECT path, thumbnail FROM photo WHERE id = $1", [
      id
    ]);
    const path = photo.rows[0].path;
    const pathI = path.replace("http://167.99.70.72:55011/public/", __basedir+ "/public/"); //. /root/SeniorProject/PostgreSQL/
    const tid = photo.rows[0].thumbnail
    console.log("[photo.js] pathI:",pathI);
    const pathT = pathI.replace("images/img-", "images/thumbnail-");
    console.log("[photo.js] pathT:",pathT);
    fs.unlinkSync(pathI);
    fs.unlinkSync(pathT);
    const deletephoto = await pool.query("DELETE FROM photo WHERE id = $1", [id]);
    const deletephotot = await pool.query("DELETE FROM photo WHERE id = $1", [tid]);
    console.log("[photo.js] id:",id);
    console.log("[photo.js] tid:",tid);


    res.json("photo was deleted!!!!");
  } catch (err) {
    console.log(err.message);
  }
});

router.delete("/deleteauth", authJwt.verifyToken, async (req, res) => {
  try {
    const photo = await pool.query("SELECT p.path as path ,p.id , pt.path as patht ,p.thumbnail as tid "+
      "FROM photo p "+
      "JOIN photo pt ON pt.id = p.thumbnail "+
      "JOIN users u ON u.photo_id = p.id "+
      "WHERE u.id = $1",
      [req.user.id]
    );

    // const photo = await pool.query("SELECT path, thumbnail FROM photo WHERE id = $1", [
    //   id
    // ]);
    const id = photo.rows[0].id
    const tid = photo.rows[0].tid
    const pathI = photo.rows[0].path.replace("http://167.99.70.72:55011/public/", __basedir+ "/public/"); //. /root/SeniorProject/PostgreSQL/
    console.log("[photo.js] pathI:",pathI);
    const pathT = photo.rows[0].patht.replace("http://167.99.70.72:55011/public/", __basedir+ "/public/");
    console.log("[photo.js] pathT:",pathT);
    fs.unlinkSync(pathI);
    fs.unlinkSync(pathT);
    const deletephoto = await pool.query("DELETE FROM photo WHERE id = $1", 
      [id]
    );
    const deletephotot = await pool.query("DELETE FROM photo WHERE id = $1", 
      [tid]
    );
    console.log("[photo.js] id:",id);
    console.log("[photo.js] tid:",tid);


    res.json("photo was deleted!!!!");
  } catch (err) {
    console.log(err.message);
  }
});


router.put("/updatephotoidauth", authJwt.verifyToken, async (req, res) => {
  try {
    const { newphoto_id } = req.body;
    const user = await pool.query("SELECT * FROM users WHERE id = $1 ", [
      req.user.id
    ])
    const username = user.rows[0].username
    const name = user.rows[0].name
    const password = user.rows[0].password
    const isactive = user.rows[0].isactive

    const newUser = await pool.query(
      "UPDATE users SET username = $2, name = $3, password = $4, photo_id = $5, isactive = $6 WHERE id = $1",
      [req.user.id, username, name, password, newphoto_id, isactive ]
    );

    res.json("photoid was updated!");
  } catch (err) {
    console.error(err.message);
  }
});



module.exports = router;