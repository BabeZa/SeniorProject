const express = require("express");
const router = express.Router();
const pool = require("../../db");
const bcrypt = require("bcrypt");
let no = 0;

//getList
router.get("/users", async (req, res) => {
  try {
    console.log("Get List");
    const { filter, range, sort } = req.query;
    const count = await pool.query("SELECT COUNT(*) FROM users");
    console.log("[Get users] query", req.query);
    console.log("[Get users] count", count.rows);
    const total = count.rows[0].count;

    if (Object.keys(req.query).length === 0) return res.json("No query");

    const parseFilter = JSON.parse(filter);
    const name = Object.keys(parseFilter);
    const value = name.length ? parseFilter.name.toLowerCase() : "";
    const pagination = JSON.parse(range);
    const start = pagination[0];
    const end = pagination[1];
    const selectedsort = JSON.parse(sort);
    const column = selectedsort[0];
    const order = selectedsort[1];

    const sql = `SELECT u.id, u.username, u.name,u.isactive,
    json_agg(json_build_object('roles_name',r.name)) AS "roles_names" 
    FROM users u 
    LEFT JOIN users_roles ur ON u.id = ur.users_id
    LEFT JOIN roles r ON r.id = ur.roles_id
     ${name.length ? `WHERE LOWER(u.${name}) LIKE '%${value}%'` : ""}
     GROUP BY u.id
     ORDER BY u.${column} ${order}
     ${start + 1 && end ? `LIMIT ${end - start + 1}` : ""} 
     ${start + 1 ? `OFFSET ${start}` : ""}`;

    const users = await pool.query(sql);
    // console.log(req.query);

    res.setHeader(
      "Content-Range",
      users.rowCount ? `users ${start}-${end}/${total}` : "users 0-0/0"
    );
    res.setHeader("Access-Control-Expose-Headers", "Content-Range");
    res.json(users.rows);
  } catch (err) {
    console.log(err.message);
  }
});

//checkuser
router.post("/users/checkuser", async (req, res) => {
  try {
    console.log("Check user");
    const { username } = req.body;
    console.log("[check users] username", username);
    const sql = `SELECT username FROM users WHERE username = '${username}'`;
    const user = await pool.query(sql);
    if (user.rowCount > 0) return res.send(true);
    res.send(false);
  } catch (err) {
    console.log(err.message);
  }
});

//getOne
router.get("/users/:id", async (req, res) => {
  try {
    console.log("Get One", no++);
    const { id } = req.params;
    console.log("[Get users id] id", id);
    const sql = `SELECT u.id, u.username, u.name,u.isactive,p.path,
     json_agg(json_build_object('id',r.id,'roles_name',r.name) ORDER BY r.name) AS "roles_names" 
     FROM users u 
     LEFT JOIN photo p ON u.photo_id = p.id
     LEFT JOIN users_roles ur ON u.id = ur.users_id
     LEFT JOIN roles r ON r.id = ur.roles_id
     WHERE u.id = '${id}'
     GROUP BY u.id,p.path `;
    const user = await pool.query(sql);
    // console.log(user.rows);
    // const roles_name = user.rows.map((row) => ({
    //   roles_name: row.roles_name,
    // }));
    // const roles_names = { roles_names: roles_name };
    // Object.assign(user.rows[0], roles_names);
    if (user.rowCount === 0) return res.json("Not Found");
    if (user.rowCount >= 1) return res.json(user.rows[0]);
    // if (user.rowCount > 1) return res.json(roles_names);
  } catch (err) {
    console.log(err.message);
  }
});

//creat
router.post("/users", async (req, res) => {
  try {
    console.log("Create");
    console.log(req.body);
    const { name, username, password, isactive } = req.body;
    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(password, salt);
    const sql = `INSERT INTO users (name, username, password,isactive,photo_id) VALUES ('${name}', '${username}','${bcryptPassword}',${isactive},1) RETURNING id`;
    const create = await pool.query(sql);
    res.json(create.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

//update
router.put("/users/:id", async (req, res) => {
  try {
    console.log("Update");
    const { id, name, isactive, new_password } = req.body;
    console.log("[PUT users id] id", id);
    console.log("[PUT users url] url", req.url);
    console.log("[PUT users body] body", req.body);
    let bcryptPassword = "";
    if (new_password) {
      const salt = await bcrypt.genSalt(10);
      bcryptPassword = await bcrypt.hash(new_password, salt);
    }
    const sql = `UPDATE users SET name = '${name}', isactive = ${isactive} ${
      new_password ? `, password = '${bcryptPassword}'` : ""
    } WHERE id = '${id}' RETURNING id`;
    const updateuser = await pool.query(sql);
    // console.log(updateuser);
    res.json(updateuser.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

router.delete("/users/:id", async (req, res) => {
  try {
    console.log("Delete");
    const { id } = req.params;
    const sql = `DELETE FROM users WHERE id = '${id}' RETURNING id`;
    const deleteuser = await pool.query(sql);
    // console.log(deleteuser);
    res.json(deleteuser.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

router.get("/userstest", async (req, res) => {
  try {
    const sql = `SELECT u.name, json_object_agg(json_build_object('id',r.id,'roles_name',r.name) ORDER BY r.name) AS "roles_names" FROM users u
    LEFT JOIN users_roles ur ON u.id = ur.users_id
    LEFT JOIN roles r ON r.id = ur.roles_id
    GROUP BY u.id`;
    const query = await pool.query(sql);
    res.json(query.rows);
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
