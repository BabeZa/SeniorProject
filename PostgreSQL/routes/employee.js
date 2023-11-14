const express = require("express");
const router = express.Router();
const pool = require("../db");
const authJwt = require("../middleware/authJwt");

router.get("/getprofile", authJwt.verifyToken, async (req, res) => {
    try {
      const employee = await pool.query(
        'SELECT e.* , p.path, u.photo_id '+
        'FROM employee e '+
        'JOIN users u ON u.id = e.users_id '+
        'JOIN photo p ON p.id = u.photo_id '+
        'WHERE users_id = $1 ',
        [req.user.id]
      );
      // console.log("[employee.js] getprofile",employee.rows[0]);
      const add = {successful: true, canedit: true}
      Object.assign(employee.rows[0], add) //. เพิ่ม successful: true 
      // console.log("[employee.js] getprofile",employee.rows[0]);
      res.json(employee.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
});

router.get("/getpersonnel/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await pool.query(
      'SELECT e.* , p.path '+
      'FROM employee e '+
      'JOIN users u ON u.id = e.users_id '+
      'JOIN photo p ON p.id = u.photo_id '+
      'WHERE e.id = $1 ',
      [id]
    );
    // console.log("[employee.js] getprofile",employee.rows[0]);
    const add = {successful: true, canedit:false}
    Object.assign(employee.rows[0], add) //. เพิ่ม successful: true 
    // console.log("[employee.js] getprofile",employee.rows[0]);
    res.json(employee.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});


router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { thainame, engname, email, phone, website, faculty_id, department_id, level, users_id, isactive, status_code } = req.body;
    const updateemployee = await pool.query(
      "UPDATE employee SET thainame = $2, engname = $3, email = $4, phone = $5, website = $6, faculty_id = $7, department_id = $8, level = $9, users_id = $10, isactive = $11, status_code = $12 WHERE id = $1",
      [id, thainame, engname, email, phone, website, faculty_id, department_id, level, users_id, isactive, status_code ]
    );

    res.json("employee was updated!");
  } catch (err) {
    console.error(err.message);
  }
});

router.post("/allfilter", async (req, res) => {
  try {
    const { type, type2, search } = req.body;
    const allemployee = await pool.query(
      "SELECT e.id, e.thainame, e.engname, ph.path as photo, e.isactive ,e.type ,e.level "+
      "FROM employee e "+
      "JOIN users u ON u.id = e.users_id "+
      "JOIN photo ph ON ph.id = u.photo_id "+
      "WHERE e.type LIKE '" + type + "%' AND ( LOWER(e.thainame) LIKE LOWER('%" + search + "%') OR LOWER(e.engname) LIKE LOWER('%" + search + "%') ) AND e.status_code NOT LIKE 'HIDE' "+
      "ORDER BY e.id ASC "
    );
    res.json(allemployee.rows);
  } catch (err) {
    console.error(err.message);
  }
});



module.exports = router;
  