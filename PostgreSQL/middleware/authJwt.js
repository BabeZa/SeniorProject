const jwt = require("jsonwebtoken");
require("dotenv").config();
const pool = require("../db");

verifyToken = (req, res, next) => {       //.. ฟังก์ชั่นตรวจสอบว่า Token ที่ส่งมาถูกต้องไหม
  let token = req.header("jwtToken");                             //. ดึง Token จาก header
  if (!token) {                                                   //. ถ้าไม่มี Token ให้ส่ง error กลับไป
    return res.status(403).send( {message: "No token provided!"} );
  }
  jwt.verify(token, process.env.jwtSecret, (err, decoded) => {    //. decoded Token 
    if (err) {                                                    //. ถ้าไม่มี error ให้ส่ง error กลับไป
      return res.status(401).send( {message: "Token is not valid"} );
    }
    req.user = decoded.user                                       //. เก็บข้อมูลที่ถอดรหัสแล้วใส่ไว้ใน req เพื่อส่งกลับ
    next();                                                       
  });
};

isAdmin = async (req, res, next) => {     //.. ฟังก์ชั่นตรวจสอบว่า role เป็น admin ไหม
  const user = await pool.query(                                  //. ดึงข้อมูลทั้งหมดตาม id ที่จาก verifyToken
    "SELECT * FROM users WHERE id = $1", [req.user.id] );
  if (user.rows.length === 0) {                                   //. ถ้าไม่มีข้อมูลห้ส่ง error กลับไป
    return res.status(404).send(  { message: "User Not found." });
  }
  const roles = await pool.query(                                 //. ดึงข้อมูลของ user นั้นพร้องกับ role
    "SELECT ur.id, ur.users_id, r.id, r.name FROM users_roles ur "+
    "JOIN roles r ON ur.roles_id = r.id WHERE users_id = $1 ", 
    [ user.rows[0].id ]);
  for (let i = 0; i < roles.rowCount; i++) {                      //. loop ที่ role ที่ดึงมา
    if (roles.rows[i].name === "admin") {                         //. ถ้า role ที่ดึงมา = "admin" ถื่อว่าผ่าน
      next();
      return;
    } 
  }
  res.status(403).send( {message: "Require Admin Role!"} );       //. ไม่ใช่ admin ส่ง error กลับไป
  return;
};

isStaff = async (req, res, next) => {
  // console.log(req.user.id);
  const user = await pool.query("SELECT * FROM users WHERE id = $1", [
    req.user.id
  ]);
  if (user.rows.length === 0) {
    // console.log("User Not found.");
    return res.status(404).send({ message: "User Not found." });
  }
  const roles = await pool.query("SELECT ur.id, ur.users_id, r.id, r.name FROM users_roles ur JOIN roles r ON ur.roles_id = r.id WHERE users_id = $1 ", [
    user.rows[0].id
  ]);
  for (let i = 0; i < roles.rowCount; i++) {
    if (roles.rows[i].name === "staff") {
      next();
      return;
    } 
  }
  res.status(403).send({
    message: "Require Staff Role!"
  });
  return;
};

isProfessor = async (req, res, next) => {
  // console.log(req.user.id);
  const user = await pool.query("SELECT * FROM users WHERE id = $1", [
    req.user.id
  ]);
  if (user.rows.length === 0) {
    // console.log("User Not found.");
    return res.status(404).send({ message: "User Not found." });
  }
  const roles = await pool.query("SELECT ur.id, ur.users_id, r.id, r.name FROM users_roles ur JOIN roles r ON ur.roles_id = r.id WHERE users_id = $1 ", [
    user.rows[0].id
  ]);
  for (let i = 0; i < roles.rowCount; i++) {
    if (roles.rows[i].name === "professor") {
      next();
      return;
    } 
  }
  res.status(403).send({
    message: "Require Professor Role!"
  });
  return;
};

isStudent = async (req, res, next) => {
  // console.log(req.user.id);
  const user = await pool.query("SELECT * FROM users WHERE id = $1", [
    req.user.id
  ]);
  if (user.rows.length === 0) {
    // console.log("User Not found.");
    return res.status(404).send({ message: "User Not found." });
  }
  const roles = await pool.query("SELECT ur.id, ur.users_id, r.id, r.name FROM users_roles ur JOIN roles r ON ur.roles_id = r.id WHERE users_id = $1 ", [
    user.rows[0].id
  ]);
  for (let i = 0; i < roles.rowCount; i++) {
    if (roles.rows[i].name === "student") {
      next();
      return;
    } 
  }
  res.status(403).send({
    message: "Require Student Role!"
  });
  return;
};

isProfessorOrAdmin= async (req, res, next) => {
  // console.log("[authJwt.js] isProfessorOrAdmin:",req.user.id);
  const user = await pool.query("SELECT * FROM users WHERE id = $1", [
    req.user.id
  ]);
  if (user.rows.length === 0) {
    // console.log("User Not found.");
    return res.status(404).send({ message: "User Not found." });
  }
  const roles = await pool.query("SELECT ur.id, ur.users_id, r.id, r.name FROM users_roles ur JOIN roles r ON ur.roles_id = r.id WHERE users_id = $1 ", [
    user.rows[0].id
  ]);
  for (let i = 0; i < roles.rowCount; i++) {
    // console.log("[authJwt.js] isProfessorOrAdmin Role:",roles.rows[i].name);
    if (roles.rows[i].name === "professor" || roles.rows[i].name === "admin") {
      // console.log("[authJwt.js] isProfessorOrAdmin Role:",roles.rows[i].name," Goooooo");
      next();
      return;
    } 
  }
  res.status(403).send({
    message: "Require Professor Role!"
  });
  return;
};

isProfessorLeader = async (req, res, next) => {
  // console.log("[authJwt.js] isProfessorOrAdmin:",req.user.id);
  const user = await pool.query("SELECT * FROM users WHERE id = $1", [
    req.user.id
  ]);
  if (user.rows.length === 0) {
    // console.log("User Not found.");
    return res.status(404).send({ message: "User Not found." });
  }
  const roles = await pool.query("SELECT ur.id, ur.users_id, r.id, r.name, ur.level FROM users_roles ur JOIN roles r ON ur.roles_id = r.id WHERE users_id = $1 ", [
    user.rows[0].id
  ]);
  for (let i = 0; i < roles.rowCount; i++) {
    // console.log("[authJwt.js] isProfessorOrAdmin Role:",roles.rows[i].name);
    if (roles.rows[i].name === "professor" && roles.rows[i].level >= 20 ) {
      // console.log("[authJwt.js] isProfessorOrAdmin Role:",roles.rows[i].name," Goooooo");
      next();
      return;
    } 
  }
  res.status(403).send({
    message: "Require Professor Role!"
  });
  return;
};

const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isStaff: isStaff,
    isProfessor: isProfessor,
    isStudent: isStudent,
    isProfessorOrAdmin: isProfessorOrAdmin,
    isProfessorLeader: isProfessorLeader

  };
  module.exports = authJwt;