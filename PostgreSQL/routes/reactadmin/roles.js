const express = require("express");
const router = express.Router();
const pool = require("../../db");

router.get("/roles", async (req, res) => {
  try {
    console.log("Role Get List");
    const { filter, range, sort } = req.query;
    const count = await pool.query("SELECT COUNT(*) FROM roles");
    console.log("[Get roles] count", count.rows);
    console.log("[Get roles] query", req.query);
    const total = count.rows[0].count;
    if (Object.keys(req.query).length === 0) return res.json("No query");
    if (filter && !(range || sort)) {
      const parseFilter = JSON.parse(filter);
      const name = Object.keys(parseFilter);
      const value = parseFilter[name][0];
      const sql = `SELECT id, name FROM roles WHERE id = '${value}'`;
      const role = await pool.query(sql);
      return res.json(role.rows);
    }

    const parseFilter = JSON.parse(filter);
    const name = Object.keys(parseFilter);
    console.log(parseFilter, name);
    const value = name.length ? parseFilter.name.toLowerCase() : "";
    const pagination = JSON.parse(range);
    const start = pagination[0];
    const end = pagination[1];
    const selectedsort = JSON.parse(sort);
    const column = selectedsort[0];
    const order = selectedsort[1];

    const sql = `SELECT id,name FROM roles
     ${name.length ? `WHERE LOWER(${name}) LIKE '%${value}%'` : ""}
     ORDER BY ${column} ${order}
     ${start + 1 && end ? `LIMIT ${end - start + 1}` : ""} 
     ${start + 1 ? `OFFSET ${start}` : ""}`;
    const roles = await pool.query(sql);
    // console.log(req.query);
    res.setHeader(
      "Content-Range",
      roles.rowCount ? `roles ${start}-${end}/${total}` : "roles 0-0/0"
    );
    res.setHeader("Access-Control-Expose-Headers", "Content-Range");
    res.json(roles.rows);
  } catch (err) {
    console.log(err.message);
  }
});

router.get("/roles/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log("[Get roles id] id", id);
    const sql = `SELECT id,name FROM roles 
     WHERE id = '${id}'`;
    const user = await pool.query(sql);
    res.json(user.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

router.put("/roles/:id", async (req, res) => {
  try {
    const { id, name, username, isactive } = req.body;
    console.log("[PUT roles id] id", id);
    console.log("[PUT roles url] url", req.url);
    console.log("[PUT roles body] body", req.body);
    const sql = `UPDATE roles SET name = '${name}' WHERE id = '${id}' RETURNING id`;
    const updateuser = await pool.query(sql);
    console.log(updateuser);
    res.json(updateuser.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
